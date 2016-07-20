/**

登陆 百度bcs控制台中心 申请access key
https://console.bce.baidu.com/iam/#/iam/accesslist

**/

var ak = 'b7d11214c8fc452db3de12028cf46daa';
var sk = '64631fe987f4423bb0a117101bf90a45'
var ocr = require('../').create(ak,sk);

// 本地图片
ocr.scan({
  url:__dirname+'/test01.jpg',
  type:'text',
},function (err,result) {
  if(err){
    return console.log(err)
  }
  console.log(result);
})
