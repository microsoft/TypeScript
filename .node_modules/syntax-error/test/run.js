var test = require('tap').test;
var check = require('../');

var fs = require('fs');
var file = __dirname + '/sources/run.js';
var src = fs.readFileSync(file);

test('do not run sources', function (t) {
    t.plan(1);
    var err = check(src, file);
    t.notOk(err);
});
