var test = require('tap').test;
var detective = require('../');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/yield.js');

test('yield', function (t) {
    t.plan(1);
    t.deepEqual(detective(src), [ 'a', 'c' ]);
});
