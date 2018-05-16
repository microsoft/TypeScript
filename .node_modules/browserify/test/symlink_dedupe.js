var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('hash instances with hashed contexts', { skip: process.platform === 'win32' }, function (t) {
    t.plan(5);

    var b = browserify(__dirname + '/symlink_dedupe/main.js');
    b.bundle(function (err, buf) {
        var c = { t: t };
        var src = buf.toString('utf8');
        t.equal(src.match(RegExp('// FILE F ONE', 'g')).length, 1);
        t.equal(src.match(RegExp('// FILE G ONE', 'g')).length, 1);
        vm.runInNewContext(src, c);
    });
});
