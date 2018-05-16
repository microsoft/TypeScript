var browserify = require('../');
var test = require('tap').test;

var isReadable = require('isstream').isReadable;
var isWritable = require('isstream').isWritable;

test('bundle is readable stream', function (t) {
    t.plan(4);
    var b = browserify(__dirname + '/entry/main.js');
    b.on('bundle', function(bundle) {
        t.ok(isReadable(bundle));
        t.notok(isWritable(bundle));
    });

    var stream = b.bundle();
    t.ok(isReadable(stream));
    t.notok(isWritable(stream));
});
