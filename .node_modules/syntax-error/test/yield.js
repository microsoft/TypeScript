var test = require('tap').test;

var fs = require('fs');
var check = require('../');

var file = __dirname + '/sources/yield.js';
var src = fs.readFileSync(file);

test('yield', function (t) {
    var err = check(src, file);
    t.notOk(err);
    t.end();
});
