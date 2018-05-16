var test = require('tap').test;
var browserify = require('../');
var vm = require('vm');

test('cycle', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/cycle/entry.js');
    b.bundle(function (err, body) {
        t.ifError(err);
        vm.runInNewContext(body);
        t.ok(true);
    });
});
