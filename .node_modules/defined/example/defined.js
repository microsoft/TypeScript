var defined = require('../');
var opts = { y : false, w : 4 };
var x = defined(opts.x, opts.y, opts.w, 8);
console.log(x);
