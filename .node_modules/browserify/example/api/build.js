var browserify = require('browserify');
var b = browserify();
b.add('./browser/main.js');
b.bundle().pipe(process.stdout);
