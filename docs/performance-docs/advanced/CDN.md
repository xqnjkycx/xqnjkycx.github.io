# CDN优化实践
CDN 内容分发网络，是前端工程的核心基础设施，也是各类静态资源的来源，同时也是优化用户体验的重要目标。

从用户体验和开发角度来看，CDN的影响体验的因素主要还是以下5类：
- CDN服务器所在的地理位置
- CDN缓存的配置
- CDN域名导致的跨域问题
- CDN所使用的压缩算法
- CDN服务器的协议版本

## CDN服务器的地理位置
服务器地理位置直接影响到了用户访问CDN服务的延迟和下载CDN上各类资源的耗时，CDN服务器的位置距离用户越近，其下载速度，连接延迟时间等影响体验的指标状况也会变好。

**所以一般要根据用户的所在位置来选择CDN服务器的地理位置，那么就要统计用户所在的地域数据**

如果不清楚前端应用的用户分布地域情况，那么可以使用[geoip-lite](https://www.npmjs.com/package/geoip-lite)NPM包基于用户请求的IP地址来获取用户所在的地域。

```js
// src\get-geo.js
const geoip = require('geoip-lite');
const { useCounter } = require('./prom-client');

/* Return Example: 
{
  "range": [3745513472, 3745517567],
  "country": "CN",
  "region": "JS",
  "eu": " 0",
  "timezone": "Asia/Shanghai",
  "city": "Suzhou",
  "ll": [31.3041, 120.5954],
  "metro":  0,
  "area":  20
}
*/
function getGeoDataFromIP(ip) {
  return geoip.lookup(ip);
}

function userRegionStatistic(ip) {
  const geo = getGeoDataFromIP(ip);
  // console.log(`geo=${JSON.stringify(geo, null,  2)}`);

  if (!geo) {
    // 忽略 ' 12 7. 0. 0. 1'等特殊IP导致的数据为null
    return;
  }

  useCounter({
    name: 'UserRegion',
    help: 'user region data from node.js server',
    labels: {
      country: geo.country,
      city: geo.city,
    },
  });
}

module.exports = {
  userRegionStatistic,
};

// 用法：
// src\app.js
app.post('/counter-metric', function (req, res) {
  const { name, help, labels } = req.body;
  useCounter({ name, help, labels });

  userRegionStatistic(
    req.headers['x-forwarded-for'] || req.socket.remoteAddress
  );
  // ...
}

```
:::tip
geoip-lite 运行时需要加载一个体积较大的数据库，一般会占据100MB的服务器内存，有可能会导致服务器应用启动变慢。
作为替代也推荐使用，内存开销更小，但查询时长略长的fast-geoip[fast-geoip](https://github.com/onramper/fast-geoip)库，两者用法几乎一致
:::

## 配置CDN缓存时间
CDN的最佳用法是文件上传之后不再覆盖更新，这样就能最大限度的利用CDN的缓存能力。而且CDN往往下载流量较多，较贵，上传流量较少，较便宜。

所系现代架构的前端应用工程一般利用**文件重命名**的方式来实现版本更新，一般通过文件内容来生成hash值添加到文件名称中作为版本号，部署上线时更新文件名中的哈希字符串，从而实现版本更新：
- 01-01 上线版本JS文件名：`bundle.djh112.js`
- 03-18 上线版本JS文件名为：`bundle.i125d.js`

基于这种部署上线的方式，完全可以把CDN上资源的缓存时间设置为**固定的最大值**，来提高缓存效果。

具体来说，可以通过配置强缓存响应头`Cache-Control`，并将缓存有效期设置为最大值`31536000`，比如：

![image](./assets/max-age.png)

## 让CDN域名符合同源策略
如果CDN资源是跨域的，那么将会配置复杂的CORS的响应头:
- `Access-Control-Allow-Origin: https://github.com`
- `Access-Control-Allow-Headers: origin, content-type, accept`
- `Access-Control-Allow-Methods: GET`
- `Access-Control-Allow-Credentials: true`

这些用于实现**跨域资源共享（CORS）**的HTTP标头复杂也容易出错，如果存在多个CDN域名，那么统一管理这些标头也很麻烦

而且对于POST方法，还需要支持`OPTIONS`

也就是说，最好的解决方案就是**避免加载跨域资源**

这里提供一个简单的实现思路，使用**负载均衡**服务，将静态资源所在的同源域名路径的请求，转发到CDN服务，实现CDN域名同源。

一般的云服务供应商的负载均衡都支持基于**域名**和**URL**的灵活转发能力。

可以利用基于**URL路径**的转发能力，实现把和前端应用所在域名同源的URL路径，例如`/static/*`，配置成静态资源专用路径。

对这个路径发送的静态资源HTTP请求，用负载均衡，转发到CDN服务器获得响应。

## 采用更好的压缩算法Broti
除了Gzip压缩算法之外还有Brotli算法来进行文件的压缩，以体积为1000KB的源文件为例：
|项目/压缩算法|Gzip|Brotli|
|------|------|------|
|源文件体积：1000KB|239KB|208KB|

通常来说Broti算法的压缩率比其他两种更高，用Brotil替代Gzip预计可以减少10%的CDN的流量开销。

GPT是这么解释Broti算法的：

Brotil压缩算法是一种基于LZ77算法和哈夫曼编码的压缩算法，具体实现方法如下：
- 1.Brotli首先会使用一种叫做连续转化的技术，将输入数据分割成一些小的块。这可以减少内存占用，并且也可以提高压缩效率。

- 2.对每个块进行预处理，包括了局部分析，共享在不同块之间的字典等操作，这些操作能够帮助Brotli产生更好的匹配。

- 3.Brotli使用LZ77算法来查找输入数据中的重复序列，找出最长的匹配序列，并将匹配的位置以及长度信息编码成一种叫做“distance”和“length”的方式。

- 4.接着，Brotli还会使用一种叫做“last-dance”或者“recompression”技术来进一步优化匹配，尤其是针对位于块边界上的匹配。

- 5.最后，Brotli使用哈夫曼编码来压缩匹配位置和长度的信息以及未匹配的原始字符，从而实现更高效的压缩。

这种一般在CDN云服务商里面的后台配置中开启压缩算法就可以了

## 更新的HTTP协议
这个不多说，现在大多数CDN还在使用**HTTP/1.1**协议，建议有能力做升级，对流量和改善用户体验都有很好的显著优化