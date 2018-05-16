var wrap = require('./wrap.js');
var ro = wrap(); // can't write to `ro` and muck up internal state
ro.pipe(process.stdout);
