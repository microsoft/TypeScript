var test = require('tap').test;
var detective = require('../');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/set-in-object-pattern.js');

test('set in object pattern', function (t) {
    t.deepEqual(
        detective(src, { word : 'load' }),
        [ 'a', 'b', 'c', 'tt' ]
    );
    t.end();
});