var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('multiple symlink execution', { skip: process.platform === 'win32' }, function (t) {
    t.plan(1);
    var b = browserify(__dirname + '/multi_symlink/main.js');
    b.bundle(function (err, src) {
        var c = { console: { log: log } };
        vm.runInNewContext(src, c);
        function log (msg) { t.equal(msg, 'X') }
    });
});
