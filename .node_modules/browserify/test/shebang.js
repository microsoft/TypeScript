var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('files with shebangs', function (t) {
    t.plan(1);
    var b = browserify(__dirname + '/shebang/main.js');
    b.bundle(function (err, src) {
        vm.runInNewContext(src, { t: t });
    });
});
