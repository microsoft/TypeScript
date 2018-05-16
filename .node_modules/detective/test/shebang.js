var test = require('tap').test;
var detective = require('../');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/shebang.js');

test('shebang', function (t) {
    t.plan(1);
    t.deepEqual(detective(src), [ 'a', 'b', 'c' ]);
});
