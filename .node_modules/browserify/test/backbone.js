var browserify = require('../');
var vm = require('vm');
var backbone = require('backbone');
var test = require('tap').test;

test('backbone', function (t) {
    t.plan(3);
    var b = browserify();
    b.require('backbone');
    b.bundle(function (err, buf) {
        t.ok(Buffer.isBuffer(buf));
        var src = buf.toString('utf8');
        t.ok(src.length > 0);
        
        var c = { console: console };
        vm.runInNewContext(src, c);
        t.deepEqual(
            Object.keys(backbone).sort(),
            Object.keys(c.require('backbone')).sort()
        );
        t.end();
    });
});
