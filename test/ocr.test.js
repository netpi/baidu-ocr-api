var should = require('should');
var ak = 'b7d11214c8fc452db3de12028cf46daa';
var sk = '64631fe987f4423bb0a117101bf90a45'
var ocr = require('../').create(ak,sk);

describe('test/ocr.test.js',function () {
  describe('scan for cdn_url  ',function () {
    it('should have result',function (done) {
      ocr.scan({
        url:'http://7xod3k.com1.z0.glb.clouddn.com/dpsqixoxxfdcdphfhgoinffvwoxdktgi',
        type:'text',
        merge:false
      },function (err,result) {
        result.should.be.an.instanceOf(Object);
        done()
      })
    })
  })

  describe('scan for local url  ',function () {
    it('should return object',function (done) {
      ocr.scan({
        url:__dirname+'/test.jpg',
        type:'line'
      },function (err,result) {
        result.should.be.an.instanceOf(Object);
        done()
      })
    })
  })

  describe('scan for wrong url  ',function () {
    it('should have result',function (done) {
      ocr.scan({
        url:'wrong url',
        type:'line'
      },function (err,result) {
        err.should.be.an.instanceOf(Error);
        done()
      })
    })
  })
})
