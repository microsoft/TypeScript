var test = require('tap').test;

var fs = require('fs');
var check = require('../');

var file = __dirname + '/sources/shebang.js';
var src = fs.readFileSync(file);

test('shebang', function (t) {
    var err = check(src, file);
    t.notOk(err);
    t.end();
});
