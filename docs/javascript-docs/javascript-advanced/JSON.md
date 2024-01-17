# JSON
结构化数据是指按照特定格式和规则组织的数据，每个数据字段都有明确的定义和类型。结构化数据的特点是易于处理，存储和分析。因为数据的结构和关系都已经非常明确。在JS诞生初期，常见的文本形式的结构化数据通常就是**XML**。

但是 XML 需要大量的 "`<>`" 标签来描述这种结构关系，因此在体积浪费上是比较严重的，对于解析和网络传输上要明显逊色于JSON

JSON的全称：**JavaScript Object Notation**。

JSON的统一的七种取值：**object array number string true false null**

## JSON的解析
单单一个数字，一个双引号字符串，一个true和false，以及一个null都是合法的JSON数据，并非只有大括号`()`，中括号`[]`包起来的结构才算。所以像下面的都能够解析成功：

```js
JSON.parse("8")
JSON.parse(`"Hello"`)
JSON.parse("true")
JSON.parse("false")
JSON.parse("null")
```
:::tip
需要注意的是，JSON只支持十进制数字，类似JSON.parse("0x01")甚至JSON.parse("01")这样都是不可以成功解析的。
:::

同时，对于 JavaScript中的特殊数字，比如`Infinity`，`NaN`。JSON都是不支持的，解析会报错，另外`undefined`也不属于 JSON 的合法类型。

以上是`JSON.parse`对于一些不常见数据格式的解析策略。如果给他传入一个非字符串类型的参数，那么会通过`ToString()`函数来转换。

同时，**`JSON.parse`还支持第二个参数`reviver`，用于精确控制解析后的值**：
```js
JSON.parse(`{
    "name": "Mike",
    "education": {
        "college": "MIT",
        "major": "computer"
    },
    "experiences": [{
        "from": "2017-08-20",
        "to": "2018-03-05",
        "employer": "Google"
    },
    {
        "from": "2018-03-17",
        "to": "2020-07-28",
        "employer": "Microsoft"
    }]
}`, function(key, value) {
    console.log(this, key, value);
    return value;
})
```
reviver 内部有三个变量可以利用，分别是`this`,`key`和`value`。

key不用说，自然是某一层级下的某一字段的键。而且，最外层的这个结构也被包含在了一个虚拟对象中：
```js
{
  '': {
    name: 'Mike',
    education: { college: 'MIT', major: 'computer' },
    experiences: [ [Object], [Object] ]
  }
}
```
并且 key 为空字符串。可以专门打印一下所有的key，会发现形成下面如此顺序：
```js
"name"
"college"
"major"
"education"
"from"
"to"
"employer"
"0"
"from"
"to"
"employer"
"1"
"experiences"
""
```
可见这是一个**深度优先遍历**的顺序，并且最后一个肯定是一个空字符串。`this`即指向当前这个key所在的对象结构中，因此一定不要用箭头函数来声明reviver，否则会篡改this。

即便有 this 和 key，`reviver` 参数在实际的应用中仍然面临着比较大的限制，因为key会重复，这时只能用this来辨别当前 key-value 的位置，但是this作为一个数据结构，通过也不方便来定位，因此，建议在JSON数据明确，且结构简单的时候，再考虑使用 `reviver`。

:::tip
可以用 reviver 来生成 JSON 本来不支持的数据类型，比如 Symbol 和 BigInt
:::

## 序列化JSON
`JSON.stringify`可以用于序列化，前提是被序列化的对象**不能包含环引用**，否则无法展开为树形平面JSON格式。
```js
let a = {}
let b = {}
a.b = b
b.a = a

JSON.stringfy(a) //Uncaught TypeError: Converting circular structure to JSON
```
这里有一些特殊格式的变量在被序列化之后的值：
```js
JSON.stringify(null)               // 'null'
JSON.stringify(undefined)          // undefined
JSON.stringify(true)               // 'true'
JSON.stringify(false)              // 'false'
JSON.stringify("abc")              // '"abc"'
JSON.stringify(123)                // '123'
JSON.stringify(Symbol("sym"))      // undefined
JSON.stringify([2, 3, 4])          // '[2,3,4]'
JSON.stringify(function foo(){})   // undefined
```

说明在向`JSON.stringfy`传递参数的时候，需要对类型有预期，需要提醒传错类型的后果是什么。这个`JSON.stringfy`函数并不是始终都返回一个字符串，还可能是 undefined，比如写下这样的代码可能会出现空指针错误

```js
function toJSON(variable) {
    return JSON.strinify(variable).trim(); // undefined.trim()
}
```

总结一下`JSON.stringify`只能正常处理 JSON 所支持的类型：字符串，数字，布尔，对象和null。对象中的函数不被支持，会返回 undefined，而undefined 又会被丢弃。即便是数字也有例外：
```js
JSON.stringify(Infinity) // 'null'
JSON.stringify(NaN) // 'null'
JSON.stringify(1n) 
// ❌ VM1315:1 Uncaught TypeError: Do not know how to serialize a BigInt

// Infinity 和 NaN 都会序列化成 “null”，而 BigInt 压根就直接抛出异常了。
```
有一种简单暴力的实现 对象深克隆 的办法：先序列化成 JSON 字符串，在 parse 成对象，就会出现存在**失真**的问题。
```js
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

clone({ m: () => {}, s: Symbol('s') }) // {}
clone([1, Infinity, NaN]) // [1, null, null]
// 这样的方式不可取的，还得老老实实的手动遍历取值去克隆
```
即便目的不是克隆，序列化一个对象也是常见的操作，比如 POST 接口提交，就要把对象变成 JSON 文本，塞入到 body 中去。

一般来说，对于对象而言，`JSON.stringify`会递归遍历自身的 **可枚举，以字符串为 key 的属性**。这基本上就是`Object.keys/values/entries`的逻辑。于是，`JSON.stringify`在普通对象上的遍历过程大致就是：
```js
function stringify(obj) {
    for (const [key, value] of Object.entries(obj)) {
        if (isObject(value)) {
            stringify(value) // 递归
        }
    }
}
```
重点来了，如果对象上有一个叫做`toJSON`的函数，在自身也好，还是在原型链也好，那么`JSON.stringify`就调用这个函数而不是再去遍历对象属性。

当然`toJSON`的返回值并不会直接作为`JSON.stringify`的输出，更像是递归传入`JSON.stringify`。目前在ES的内置的对象类型中，只有`Date`定义了toJSON，它返回等价于调用tolSOString的字符串：

```js
JSON.stringify({now: new Date}) // {"now":"2023-07-10T13:11:15.960Z"}
```
本质来说，`JSON.stringify`就是一套映射函数，对于对象（包括数组）这种结构化数据进行递归调用。而 toJSON 就如同开了一个后门，能够简单的让对象决定自己的JSON表述是什么样子的。

如果对象中一些属性不想被序列化，那么可以考虑定义成不可枚举的，或者以 Symbol 而不是 String 为 Key。如果这样不方便，那就需要使用`JSON.stringify`的第二个参数`replacer`了。

其中，`replacer`可以是一个函数也可以是一个数组，TypeScript是如下定义的：
```ts
stringify(value: any, replacer?:
          (this: any, key: string, value: any) => any, space?: string | number): string;
stringify(value: any, replacer?: 
          (number | string)[] | null, space?: string | number): string;

```
当作为函数的时候，它和`JSON.parse`中的 reviver 有异曲同工之妙，只不过 reviver 先遍历到最底层的节点，而 replacer 先遍历最上层的节点。
```js
JSON.stringify({
    "name": "Mike",
    "education": {
        "college": "MIT",
        "major": "computer"
    },
    "experiences": [{
        "from": "2017-08-20",
        "to": "2018-03-05",
        "employer": "Google"
    },
    {
        "from": "2018-03-17",
        "to": "2020-07-28",
        "employer": "Microsoft"
    }]
}, function(key, value) {
    console.log(key);
    return value;
})
```
最后得到的结果如下：
```js
""
"name"
"education"
"college"
"major"
"experiences"
"0"
"from"
"to"
"employer"
"1"
"from"
"to"
"employer"
```
`replacer`函数的作用就是“篡改”序列化之后的数据，简单的例子：
```js
JSON.stringify({
    name: 'Tom'
}, function(key ,val) {
    if (key === 'name') return 'Mike';
    return val;
});
```
`replacer`还可以是一个数组，不过这个时候它只能发挥一个白名单(**filter**)的作用，并不能实现值的替换。
数组的成员只能是数字和字符串。数字会被`ToString`转换成字符串，当数字作为一个对象的属性名时才会这样做。

`replacer`也会认可String对象和Number对象，甚至它们的子类，比如：
```js
class MyString extends String {}

JSON.stringify({
    name: 'Tom',
    age: 15
}, [new MyString("name")]); // {"name": "Tom"}

```
根据遍历的顺序，如果上层的key没有出现在`replacer`数组中，那么其 value 就会被直接丢弃，即便说有key存在于`replacer`中：

```js
JSON.stringify({
    name: 'Tom',
    education: {
        college: "MIT",
        major: "computer"
    }
}, ["name", "major"]); // {"name": "Tom"}
```
:::tip
如果序列化的对象有不同层级，语义的同名 key，那么就需要更加谨慎使用 replacer
:::
另外，如果要序列化一个数组，那么数组形式的replacer是无效的：

```js
JSON.stringify(
    [1,2,3,4,5],
    [0,3] // ❌ 参数无效
) // "[1,2,3,4,5]"
```
到目前为止，`JSON.stringify`输出的字符串还是都是单行的，为了更好的书面化，需要习惯于使用它的第三个参数`space`。
`space`可以是数字也可以是字符串，语义上代表缩进的字符或者空白的个数。如果是数字，比如N，那么格式化后的JSON字符串每层级就会缩进N个空格：
```js
JSON.stringify(
    {
        name: "Mike",
        education: {
            college: "MIT",
            major: "computer",
        },
    },
    null,
    8
);
```
8个空格缩进
```js
{
        "name": "Mike",
        "education": {
                "college": "MIT",
                "major": "computer"
        }
}
```
如果要缩进Tab（0x9）而不是空格，那么就需要把`space`设置成字符串：
```js
JSON.stringify(
    {
        name: "Mike",
        education: {
            college: "MIT",
            major: "computer",
        },
    },
    null,
    '\u0009' // Tab
);
```
:::tip
缩进字符不能超过10个，space如果是数字，超过10会被当作10；如果是字符串，超过10的码元会被截断
:::

## JSON的常见场景
JSON的文本特征，最适合来做网络传输。在 fetch 之前，使用`XMLHttpRequest`也可以直接解析JSON格式的响应内容：
```js
const xhr = new XMLHttpRequest();

xhr.responseType = 'json';
```
这样最后 `xhr.response` 就直接是 JSON 对象。如果服务端可以返回多种格式，但是期望它返回 JSON，那么就需要主动设置 HTTP 的 `Accept` 请求头：
```js
xhr.setRequestHeader('Accept', 'application/json');
```
如果发出去的数据也是JSON，那么：
```js
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.open('POST', '/submit');

xhr.send(JSON.stringify({ name: 'Mike' }));
```
这样发出去的HTTP请求大概就是：
```js
POST /submit HTTP/1.1
Accept: application/json
ContentType: application/json

{"name":"Mike"}
```
以上的等价`fetch`写法就是：
```js
fetch("/submit", {
    headers: {
        accept: "application/json",
        "content-type": "application/json",
    },
    body: JSON.stringify{name: "Mike"},
    method: "POST",
});
```