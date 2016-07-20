var should = require('should');
var ak = 'b7d11214c8fc452db3de12028cf46daa';
var sk = '64631fe987f4423bb0a117101bf90a45';
var wrong_sk = 'wrong_sk';
var ocr = require('../').create(ak,sk);
var ocr2 = require('../').create(ak,wrong_sk);

describe('test/ocr.test.js',function () {
  describe('scan for cdn_url  ',function () {
    it('should have result',function (done) {
      ocr.scan({
        url:'http://7xod3k.com1.z0.glb.clouddn.com/mjdalykzuyefpzlgmlnkjizcfcuelxnu',
        type:'text',
      }).then(function (result) {
        result.should.be.an.instanceOf(Object);
        done();
      })
    })
  })
  describe('wrong_sk  ',function () {
    it('should be catch error',function (done) {
      ocr2.scan({
        url:'http://7xod3k.com1.z0.glb.clouddn.com/mjdalykzuyefpzlgmlnkjizcfcuelxnu',
      }).then(function (result) {

      }).catch(function (err) {
        err.should.be.an.instanceOf(Error);
        done();
      })
    })
  })
  describe('scan for cdn_url: merge==false  ',function () {
    it('should have result',function (done) {
      ocr.scan({
        url:'http://7xod3k.com1.z0.glb.clouddn.com/mjdalykzuyefpzlgmlnkjizcfcuelxnu',
        type:'text',
        merge:false
      }).then(function (result) {
        result.should.be.an.instanceOf(Object);
        done()
      })
    })
  })
  describe('scan for  wrong local_url  ',function () {
    it('should have result',function (done) {
      ocr.scan({
        url:'http://wrong_url',
        type:'text'
      }).then(function (result) {

      }).catch(function (err) {
        err.should.be.an.instanceOf(Error);
        done()
      })
    })
  })
  describe('scan for local url  ',function () {
    it('should return object',function (done) {
      ocr.scan({
        url:__dirname+'/test01.jpg',
        type:'text'
      }).then(function(result) {
        result.should.be.an.instanceOf(Object);
        done()
      })
    })
  })

  describe('scan for  wrong local_url  ',function () {
    it('should have result',function (done) {
      ocr.scan({
        url:'wrong url',
        type:'line'
      }).then(function (result) {

      }).catch(function (err) {
        err.should.be.an.instanceOf(Error);
        done()
      })
    })
  })
})
