/**

登陆 百度bcs控制台中心 申请access key
https://console.bce.baidu.com/iam/#/iam/accesslist

**/

var ak = 'b7d11214c8fc452db3de12028cf46daa';
var sk = '64631fe987f4423bb0a117101bf90a45'
var ocr = require('../').create(ak,sk);
// 外部图片
ocr.scan({
  url:'http://7pun4e.com1.z0.glb.clouddn.com/test.jpg',
  type:'text',
}).then(function (result) {
  return console.log(result)
}).catch(function (err) {
  console.log('err', err);
})
