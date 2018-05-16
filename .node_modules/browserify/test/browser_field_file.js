var test = require('tap').test;
var vm = require('vm');
var browserify = require('../');

test('browser field file no ext', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/browser_field_file/xyz');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (msg) { t.equal(msg, 'cool beans') }
    });
});
