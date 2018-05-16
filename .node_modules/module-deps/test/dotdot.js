var mdeps = require('../');
var test = require('tap').test;
var through = require('through2');
var path = require('path');

test('dotdot', function (t) {
    var expected = [
        path.join(__dirname, '/dotdot/index.js'),
        path.join(__dirname, '/dotdot/abc/index.js')
    ];
    t.plan(expected.length);
    
    var d = mdeps();
    d.end(path.join(__dirname, '/dotdot/abc/index.js'));
    
    d.pipe(through.obj(function (row, enc, next) {
        t.deepEqual(row.file, expected.shift());
        next();
    }));
});
