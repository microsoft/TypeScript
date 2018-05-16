var detective = require('../');
var fs = require('fs');

var src = fs.readFileSync(__dirname + '/src/jquery.js', 'utf8');
var t0 = Date.now();
var requires = detective(src);
console.log(Date.now() - t0);
