# 事件循环与异步IO
:::tip MDN
JavaScript有一个基于事件循环的并发模型，事件循环负责执行代码，收集和处理事件以及执行队列中的子任务。
:::
但在Node中，**Node.js的事件循环是自己实现的**，而不是完全复刻V8已有的一套事件循环。

作为能跑后端服务的JavaScript运行时，必须要有处理系统事件的能力。比如去处理各种文件描述符对应的读写事件，用伪代码来描述就是：
```js
while(还有事件在监听){
  const events = 从监听中获取所有事件的信息
  for(const event of events){
    handle(event)
  }
}
```
一个`setTimeout`可以是一个Timer事件，一个文件读写是一个系统的`I/O`事件。而Node基于**libuv**完成了自己事件循环与异步I/O。
:::tip
libuv是一个聚焦于I/O的跨平台库。

它是一个非常符合Node.js自身需求的异步I/O库，连里面的 API 都是为 Node.js 的各种能力设计的。

其API也非常简单，主要是包含文件描述符的监听，读写，连接以及定时器。
:::

## 事件循环 !== 异步I/O
事件循环本质上是一种并发模型，主要是一个死循环，并在循环中不断处理到来的事件。

而异步I/O事件只是事件循环中事件的一种，除此之外还有各种其他的事件，比如定时器事件也是一种事件，但它并不是异步I/O。

事件循环就是一个死循环，那么把它的逻辑按时序拉平，就是一条直线。而大多数事件都是阻塞在等待事件，这个时候并不消耗CPU，一旦事件在底层完成了，就进入死循环代码块中的下一步，即拿着通知的相应内容去做用户业务逻辑。

比如文件读取完成了，那么libuv的事件循环就会把对应信息给到等到这个事件的回调函数，而通常这个回调函数最终回一路调至到JavaScript，从而唤起JavaScript侧的文件读取的回调函数，其底层表现为：
```js
fs.readFile(filename,(err,content)=>{
  // 这里就是callback
})
```
代码里面读取某个文件，然后就调用libuv去读取，假设没有更多其他事件，那么底层就会等着读取完毕的事件，也就是说，底层代码阻塞在等待事件上，直到读取完成，有事件通知，才会进行最终的调用。

也就是说，每一次事件循环执行一次回调操作时，都说明某个事件触发了，那么这样一次操作就可以理解为一个**tick**。

比如：
```js
fs.readFile(filename, (err, content) => {
  fs.writeFile(filename, content, err => {
    // 假设这个 `writeFile` 写文件要持续 2 秒钟
  });

  setTimeout(() => {
    console.log('timer done!');
  }, 1000);
});

```
通过画图可以将这段代码理解为
![image](../assets/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

## Node事件循环源码解读
可以看一下Node.js的源码是大致上怎么写的，每个版本都要差异，但是一般来说大差不差：

这段代码的目的是在libuv事件循环中运行不同的类型的任务，并在一定条件下退出循环：
```js
// 1.do-while 是一个循环 如果more为true 且env没有stopping就一直执行
do {
  // 2.每次循环开始前检查env是否停止，如果是就停止循环
  if (env->is_stopping()) break;
  // 3.运行libuv事件循环，处理所有挂起的事件和回调函数，uv_run会一直运行
  // 直到事件循环中没有活动事件或回调，或者被显示执行
  uv_run(env->event_loop(), UV_RUN_DEFAULT);
  if (env->is_stopping()) break;
  // 4.在libuv事件循环之后，需要处理一些其他平台相关的任务
  platform->DrainTasks(isolate);
  // 5.检查libuv事件循环是否处于活跃状态
  more = uv_loop_alive(env->event_loop());
  if (more && !env->is_stopping()) continue;
  // 6.发出一个beforeExit事件，如果事件发出成功，则继续执行后续的代码
  // 如果发送失败，就退出循环
  if (EmitProcessBeforeExit(env).IsNothing())
    break;

  {
    // 7.创建一个JavaScript作用域对象，用于管理JS对象的生命周期
    HandleScope handle_scope(isolate);
    if (env->RunSnapshotSerializeCallback().IsEmpty()) {
      break;
    }
  }
  // 8.再次检查libuv事件循环是否处于活跃状态
  more = uv_loop_alive(env->event_loop());
} while (more == true && !env->is_stopping());
```
其中`uv_run(env->event_loop(), UV_RUN_DEFAULT)`就是跑一轮事件循环。而其中的`UV_RUN_DEAFULT`代表执行事件循环监听的池子里面已经没有关心的事件正在等待了。

所以可以看到这段代码有两层循环，第一层在`uv_run()`里面实际的事件循环，把它简称为**小循环**。第二层在`do-while`，它是包在小循环外的一层**大循环**。

### 大循环
在大循环中，首先是对`is_stopping()`的判断，一旦处于待停止状态，就立马结束事件循环。

第一次`uv_run()`之后，去跑V8 Platform中的一些任务，跑完之后，可能不太清楚有没有新的事件放进入，所以需要判断`uv_loop_alive()`现在是否alive，如果没有alive了，就需要做一些收尾工作，比如去执行`EmitProcessBeforeExit(env)`事件，若没有可以直接退出循环了，若有，说明有可能被丢入了新的事件比如`setTimeout`事件，如果有那么害得进入下一轮循环。
:::tip
大循环的存在是为了保证小循环结束后，程序是真的要结束了，还是有可能再丢事件进去，重新来一轮小循环。
:::

### 小循环
小循环中就是`uv_run()`内部的内容了，源码如下:
```js
int uv_run(uv_loop_t* loop, uv_run_mode mode) {
  int timeout;
  int r;
  int ran_pending;
  // 1.判断是否有存活的事件
  r = uv__loop_alive(loop);
  if (!r)
    // 2.如果没有存活事件，更新loop的最后处理时间
    uv__update_time(loop);

  while (r != 0 && loop->stop_flag == 0) {
    // 3.更新loop的最后处理时间
    uv__update_time(loop);
    // 4.执行定时事件，找出上一次更新的“loop最后处理时间”已过期的事件拿来处理
    uv__run_timers(loop);
    // 5.遍历执行I/O事件已结束（完成，失败）并丢进pending队列中等待执行
    ran_pending = uv__run_pending(loop);
    // 6.遍历并执行idle事件
    uv__run_idle(loop);
    // 7.遍历并执行prepare事件
    uv__run_prepare(loop);

    timeout = 0;
    if ((mode == UV_RUN_ONCE && !ran_pending) || mode == UV_RUN_DEFAULT)
      // 8.获取尚未触发的离现在最近的定时器的时间间隔(uv_backend_time)
      // 即事件循环到下一次循环的最长时间
      timeout = uv_backend_timeout(loop);
    // 9.监听等待I/O事件触发，并以上一步获取的时间间隔作为最大监听时间，若超时还没事件触发
    // 则直接取消这次等待，因为时间到了还没事件触发，但定时器触发事件到了
    // libuv 就要停下来处理下一轮定时器
    uv__io_poll(loop, timeout);
    uv__metrics_update_idle_time(loop);
    // 10.遍历并复查check事件
    uv__run_check(loop);
    // 11.执行一些收尾工作
    uv__run_closing_handles(loop);
    // 12.如果执行模式为`UV_RUN_ONCE`，即跑一个tick
    if (mode == UV_RUN_ONCE) {
      uv__update_time(loop);
      uv__run_timers(loop);
    }
    // 13.重新遍历一遍是否有活跃的事件，因为上一轮结束之后监听被取消了
    r = uv__loop_alive(loop);
    if (mode == UV_RUN_ONCE || mode == UV_RUN_NOWAIT)
      break;
  }
  
  if (loop->stop_flag != 0)
    loop->stop_flag = 0;

  return r;
}
```
可以看出`while`循环的退出条件就是“没有活跃事件”了，而且整个事件循环不处于`stop`状态，就是`loop->stop_flag == 0`。

结合着看，在大循环中，执行了`uv_run`进入小循环，且模式设置为`UV_RUN_DEFAULT`。不过Node.js中，对小循环的返回值没有采取判断，而是在 V8 Platform 跑了一遍任务之后，又通过`uv_loop_alive()`重新获取了一遍“是否有活跃事件”。

然而在大循环中经历了一轮小循环之后，可能活跃事件又出来了，所以又要跑一轮大循环，再大循环中进行新的小循环，如此反复

可以把上面的流程继续精简一下：
![image](../assets/Node%E7%9A%84%E5%BC%82%E6%AD%A5%E5%BE%AA%E7%8E%AF%E6%B5%81%E7%A8%8B.png)

可以看到一次小循环的执行顺序为：
- 定时器
- 处于Pending态的 I/O 事件
- Idle 事件
- Prepare 事件
- Poll I/O 事件
- Check事件
- 收尾事件

下面描述一下这些事件是什么？
### 定时器
定义一个超时事件，到点触发。在每一个小轮回里都是优先被执行的，所谓“到点”，就是基于每次通过`uv__update_time`，把“当前事件”植入到`loop`的时间点

### Pending态的I/O事件
在一般情况下，所有的I/O回调函数都会在Poll I/O后立即调用。

但是，依然存在一些情况，需要将这样的回调函数推迟到下一次循环迭代中调用。如果上一次循环延迟了任何I/O回调函数，则会在此时调用它。

比如说，当TCP进行连接时，发生了`ECONNEEREFUSED`错误时，就会需要延迟报错，将这个错误的处理放在`pending_queue`，等待下一次循环时，在定时器处理之后再处理这个Pending态的I/O错误。

### Idle事件
若事件循环中存在Idle事件，小轮回中会强行设置`timeout`为`0`，即不阻塞I/O等待，可以马上开始进入下一轮轮回。在Node18里，那就是`setImmediate`，**之所以他能immediate，就是因为它通过一个空的Idle事件让小循环强制不等待I/O**。

### Prepare事件
准备事件与空转事件类似。它在一个小乘轮回中，刚刚晚于空转事件执行。与空转事件不同的是，它不阻塞 I/O，不会干涉 `timeout`。

### Poll I/O事件
I/O等到有事件触发的时候，再去执行相应的回调函数。

### Check事件
它与“准备事件”一前一后，围绕着 Poll I/O 事件。可理解为一个是为 I/O 事件做准备，另一个是为其做一些后续额外操作。

### 收尾事件
例如一个句柄被 `uv_close()` 所关闭，且其存在关闭的回调，则会在该阶段被调用