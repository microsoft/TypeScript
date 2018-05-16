var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('optionally preserves symlinks', { skip: process.platform === 'win32' }, function (t) {
    t.plan(2);

    var b = browserify(__dirname + '/preserve_symlinks/a/index.js', {preserveSymlinks: true});
    b.bundle(function (err, buf) {
        t.ifError(err);
        t.ok(buf);
        var src = buf.toString('utf8');
        vm.runInNewContext(src, {});
    });
});

test('always resolve entry point symlink', { skip: process.platform === 'win32' }, function (t) {
    t.plan(2);

    var b = browserify(__dirname + '/preserve_symlinks/linked-entry.js', {preserveSymlinks: true});
    b.bundle(function (err, buf) {
        t.ifError(err);
        t.ok(buf);
        var src = buf.toString('utf8');
        vm.runInNewContext(src, {});
    });
})
