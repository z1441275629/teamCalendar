/**
 * @author web得胜
 * @param {Object} obj 需要拼接的参数对象
 * @return {String}
 * */
function obj2qs(obj) {
  if (!obj && !Object.keys(obj).length) {
    return "";
  } else {
    var arr = [];
    for (var key in obj) {
      arr.push(key + "=" + encodeURIComponent(obj[key]));
    }
    return arr.join("&");
  }
}

/**
 * @author web得胜
 * @param {String} url url地址栏
 * @return {Object}
 */
function qs2obj(url) {
  var qs = url.split("?")[1];
  var arr = [];
  var res = {};
  if (!qs) {
    // return res;
  } else {
    arr = qs.split("&");
    for (var i = 0, len = arr.length; i < len; i++) {
      var key = arr[i].split("=")[0];
      var val = arr[i].split("=")[1];
      res[key] = decodeURIComponent(val);
    }
  }
  return res;
}
