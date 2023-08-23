// @strict: true
// @checkJs: true
// @noEmit: true

// @filename: index.js

const format = function(f) {
  var str = '';
  var i = 1;
  var args = arguments;
  var len = args.length;
  for (var x = args[i]; i < len; x = args[++i]) {
    str += ' ' + x;
  }
  return str;
};

const debuglog = function() {
  return format.apply(null, arguments);
};
