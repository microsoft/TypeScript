// https://github.com/substack/node-browserify/issues/1325

var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('shared symlink', { skip: process.platform === 'win32' }, function (t) {
    t.plan(1);
    var b = browserify(__dirname + '/shared_symlink/main.js');
    b.bundle(function (err, src) {
        // does the same thing as node: crashes
        t.equal(err.message, "Cannot find module 'foo' from '"
            + __dirname + "/shared_symlink/shared'"
        );
    });
});
