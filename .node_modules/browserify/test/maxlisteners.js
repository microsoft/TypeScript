var test = require('tap').test;
var browserify = require('../');
var vm = require('vm');

test('setMaxListener', function (t) {
    t.plan(1);
    var b = browserify();
    b.add(__dirname + '/maxlisteners/main.js');
    b.bundle(function (err, src) {
        vm.runInNewContext(src);
        t.ok(true); // didn't crash
    });
});
