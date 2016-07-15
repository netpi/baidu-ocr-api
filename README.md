## [Baidu-OCR-API](https://bce.baidu.com/doc/OCR/ProductDescription.html#.E4.BB.8B.E7.BB.8D) for nodejs


[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]
 [![Downloads][downloads-image]][npm-url]
### Install
```
npm install baidu-ocr-api --save

```
### Usage

> 登陆 [百度bcs控制台中心](https://console.bce.baidu.com/iam/#/iam/accesslist) 申请access key
>
参看 [examples](https://github.com/netpi/baidu-ocr-api/tree/master/examples)

```js
var should = require('should');
var ak = 'your ak';
var sk = 'your sk';
var ocr = require('../').create(ak,sk);
var opt= {
  //  url can be a cdn url, or a local url like : __dirname+'/test.jpg'  
  url:'http://7xod3k.com1.z0.glb.clouddn.com/fbuguhlemsgeilpkxykeluenbjkozzne',
  // type: line,text,character default:line
  type:'line',
  language:'CHN_ENG'
}
ocr.scan(opt,function (err,result) {
    if(err){
      return console.log(err);
    }
    console.log(result); // 参看 examples

})


```
### opt
| 字段名      | 值                                        | 选项          | 描述     |
| -------- | ---------------------------------------- | ----------- | ------ |
| url      | `cdn` 地址 <br/> 本地地址: __diranme+'/test.jpg' | 必选          | 目标地址   |
| type     | `text`:识别某张图中的所有文字<br>`line`: 将结果作为单行文字去解析<br>`character`:识别某张图中的单个文字 | 可选(默认:line) | 返回结果结构 |
| language | , <br/>可选 : `CHN_ENG`/`CHN`/`ENG`   | 可选<br/> 默认:`CHN_ENG`          | 返回语言类型 |




### test
```sh
make test
make cov # Coverage rate
```
### license MIT
