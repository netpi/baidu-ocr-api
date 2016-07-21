## [Baidu-OCR-API](https://bce.baidu.com/doc/OCR/ProductDescription.html#.E4.BB.8B.E7.BB.8D) For Nodejs

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]

[![Downloads][downloads-image]][npm-url]

### Advantages
-  支持本地图片 外部图片(速度取决图片大小)
-  识别简单的验证码
-  平时相机拍摄书本的文字,基本能达到 95%
-  支持 shell/nodejs 全局安装可在控制台直接运行
-  bluebird/promise 接口操作灵活

### Install & Usage

#### 1. Global

```sh
npm install baidu-ocr-api -g

ocr --help

# 远程图片
ocr http://7pun4e.com1.z0.glb.clouddn.com/test.jpg

# 本地图片
ocr ./test.jpg

```
##### 效果图



![](https://raw.githubusercontent.com/netpi/baidu-ocr-api/master/examples/test01.jpg)



   的早期世界观是建立在《魔兽争霸3：冰封王座》的基础上的，因此与现在暴雪公司的《魔兽世界》的背景设定有一定的联系，但由于版本更迭又略有不同。整个地图中地形名费伍德森林，费伍德森林是网络游戏《魔兽世界》中的游戏地图，位于卡利姆多境内的一片森林。这片由森林和草场构成的繁荣动荡的土地曾经由卡尔多雷掌管，并曾经处于半神塞纳留斯的保护下。燃烧军团的铁蹄践踏了这片土地，没有被毁灭的树木和生物则被恶魔的暴行永远的诅咒着


#### 2. Nodejs
```sh
npm install baidu-ocr-api --save

```
FYI [examples](https://github.com/netpi/baidu-ocr-api/tree/master/examples)

```js
/**

登陆 百度bcs控制台中心 申请access key
https://console.bce.baidu.com/iam/#/iam/accesslist

**/
var ak = 'your ak';
var sk = 'your sk';
var ocr = require('baidu-ocr-api').create(ak,sk);
// 外部图片
ocr.scan({
  url:'http://7pun4e.com1.z0.glb.clouddn.com/test.jpg', // 支持本地路径
  type:'text',
}).then(function (result) {
  return console.log(result)
}).catch(function (err) {
  console.log('err', err);
})

```

### Test
```sh
make test
make cov # Coverage rate
```
### License MIT


[downloads-image]: http://img.shields.io/npm/dm/baidu-ocr-api.svg

[npm-url]: https://npmjs.org/package/baidu-ocr-api
[npm-image]: http://img.shields.io/npm/v/baidu-ocr-api.svg

[travis-url]: https://travis-ci.org/netpi/baidu-ocr-api
[travis-image]: https://travis-ci.org/netpi/baidu-ocr-api.svg?branch=master

[coveralls-url]: https://coveralls.io/r/netpi/baidu-ocr-api
[coveralls-image]:https://coveralls.io/repos/netpi/baidu-ocr-api/badge.svg?branch=master&service=github
