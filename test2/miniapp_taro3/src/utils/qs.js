var has = Object.prototype.hasOwnProperty;
export default {
  parse(str){
    if (!str || !str.trim().length) return null;
    else {
      if (
        !~str.indexOf('?') &&
        (~str.indexOf('=') &&
        ~str.indexOf('&'))
      ) {
        str = str.split('&').map(t => t.trim()).filter(t => ~t.indexOf('=')).map(t => (options.decodeEach ? options.decoder(t) : t));
      } else {
        str = [str];
      }
      if (str.length) {
        return str.reduce((r, c) => {
          c = c.split('=');
          if (c.length > 2) c = [c.shift(), c.join('=')];
          if (c[0]) {
            if (c[1]) {
              r[c[0]] = +c[1] ? +c[1] : c[1];
            } else {
              r[c[0]] = options.placeholder;
            }
          }
          return r;
        }, {});
      } else {
        return null;
      }
    }
  },
  stringify(obj, prefix) {
    var pairs = [];
    for (var key in obj) {
      if (!has.call(obj, key)) {
        continue;
      }

      var value = obj[key];
      var enkey = encodeURIComponent(key);
      var pair;
      if (typeof value === "object") {
        pair = queryStringify(
          value,
          prefix ? prefix + "[" + enkey + "]" : enkey
        );
      } else {
        pair =
          (prefix ? prefix + "[" + enkey + "]" : enkey) +
          "=" +
          encodeURIComponent(value);
      }
      pairs.push(pair);
    }
    return pairs.join("&");
  }
};
