var crypto = require('crypto');
var urllib = require('urllib');
var fs = require('fs');
var headersToSign = [];
function OCR(ak,sk) {
  this.ak = ak;
  this.sk = sk;
}

module.exports.create = function(ak,sk) {
  return new OCR(ak,sk);
};
OCR.prototype.scan = function scan(opt,cb) {

  var pathOpt = {
    text:'/v1/recognize/text', // 识别某张图中的所有文字
    line:'/v1/recognize/line', // 将结果作为单行文字去解析
    character:'/v1/recognize/character' // 识别某张图中的单个文字
  }
  // init data
  var type = opt.type||'line';
  var path = pathOpt[type];
  var url = opt.url;

  var accessKeyId = this.ak;
  var secretAccessKey = this.sk;
  var requestDate = new Date().toISOString().slice(0, -5) + 'Z';
  var expire = 3600;
  var httpMethod = 'post';

  var params = {}; //
  var headers = {
    'host': 'ocr.bj.baidubce.com',
    'x-bce-date': requestDate
  };
  getImgBase64(url,function (err,result) {
    if(err){
      return cb(err);
    }
    var data = {
      base64:result
    };
    // get Authorization
    var databuffer = new Buffer(JSON.stringify(data));
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = databuffer.length;

    var content = 'bce-auth-v1/'+ accessKeyId +'/'+ requestDate +'/' + expire;
    // get SigningKey
    var SigningKey = crypto.createHmac('sha256', secretAccessKey).update(content).digest('hex');
    var CanonicalURI = path;
    var CanonicalQueryString = getCanonicalQueryString(params);
    var CanonicalHeaders = getCanonicalHeaders(headers);
    var CanonicalRequest = [httpMethod.toUpperCase(), CanonicalURI, CanonicalQueryString, CanonicalHeaders].join('\n');
    // get Signature
    var Signature = crypto.createHmac('sha256', SigningKey).update(CanonicalRequest).digest('hex');
    // Mosaic Authorization
    headers.Authorization = [content, headersToSign.join(';'), Signature].join('/');
    var url = 'http://'+headers.host+path;
    var options = {
      host: headers.host,
      path: path+'?'+getCanonicalQueryString(params),
      method: httpMethod,
      headers: headers,
      timeout:15000,
      data:data
    };
    // send request
    urllib.request(url,options,function (err,data,resp) {
      if(err){
        return cb(err)
      }
      return cb(null,JSON.parse(data.toString()))
    })
  })
}

String.prototype.startWith = function(compareStr){
  return this.indexOf(compareStr) == 0;
}
function getCanonicalQueryString(params) {
    var result = [];
    for(var key in params) {
      if(key.toLowerCase() != 'authorization') {
        result.push(normalize(key) + '=' + normalize(params[key]));
      }
    }
    result.sort();
    return result.join('&');
  }

  function getCanonicalHeaders(headers) {
    headersToSign = ['host', 'content-md5', 'content-length', 'content-type'].concat(headersToSign);
    var result = [];
    var tempHeaderToSign = [];
    for(var key in headers) {
      var keyLower = key.toLowerCase();
      var value = headers[key].toString().trim();
      if(/^x-bce-/.test(keyLower) || new RegExp(keyLower).test(headersToSign)) {
        var temp = normalize(keyLower) + ':' + normalize(value);
        tempHeaderToSign.push(normalize(keyLower));
        result.push(temp);
      }
    }
    headersToSign = tempHeaderToSign.sort();
    result.sort();
    return result.join('\n');
  }

  function normalize(input, exceptSlash) {
    var result = '';
    if(input == null) {
      return result;
    }
    input = input.toString();
    for (var i = 0; i < input.length; i++) {
      var ch = input.charAt(i);
      if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9') || ch == '_' || ch == '-' || ch == '~' || ch == '.') {
        result += ch;
      } else if (ch == '/') {
        result += !exceptSlash ? '%2F' : ch;
      } else {
        result += '%' + new Buffer(ch).toString('hex').toUpperCase();
      }
    }
    return result;
  }
  // 获取base64
  function getImgBase64(url,cb) {
    // 外部地址
    console.log('url', url);
    if(url.startWith('http')||url.startWith('https')){
      urllib.request(url,{
        headers:{
          'User-Agent': 'Paw/2.1 (Macintosh; OS X/10.10.5) GCDHTTPRequest',
          'Referer':'http://baidu.com'
        }
      },function(err,data,resp) {

        if(err){
          return cb(err)
        }
        return cb(null,data.toString('base64'));
      })
    }else{ // 本地地址
      fs.readFile(url,function (err,data) {
        if(err){
          return cb(err)
        }else{
          return cb(null,data.toString('base64'))
        }
      })
    }
  }
