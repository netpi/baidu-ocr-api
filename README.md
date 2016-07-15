## Baidu-OCR-API for nodejs
---
### Install
```
npm install baidu-ocr-api --save

```
### Useage

```js
var should = require('should');
var ak = 'your ak';
var sk = 'your sk';
var ocr = require('../').create(ak,sk);
var opt= {
  //  url can be a cdn url, or a local url like : __dirname+'/test.jpg'  
  url:'http://7xod3k.com1.z0.glb.clouddn.com/bdjgabbhktuzrptnxtosgxnfmlaviwat',
  // type: line,text,character default:line
  type:'line'
}

ocr.scan(opt,function (err,result) {
    if(err){
      return console.log(err);
    }
    console.log(result);
    /**
    {
    results: [{
      rectangle: {
        left: 0,
        top: 0,
        width: 777,
        height: 269
      },
      word: '性站重的用户流失,很多时候网站性能问题是网站架构升级优化的触发器。可以说性能是网峡构设计的一个重要或面,任何软乎架构设计方案都必财滤可能会带来的性能问题。    也正是因为性能问题几乎无处不在,所以优化网站性能的手段也目瑞多,从用户浏览器到数据库,影响用户请求的所有环节嘟可以进行性能优化。'
      }]
    }
    **/

})

```
![](http://7xod3k.com1.z0.glb.clouddn.com/bdjgabbhktuzrptnxtosgxnfmlaviwat)

### test
```sh
make test
make cov # Coverage rate
```
### license MIT
