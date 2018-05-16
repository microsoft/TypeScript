var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('trailing comment', function (t) {
    t.plan(1);
    var b = browserify(__dirname + '/comment/main.js');
    b.bundle(function (err, src) {
        var c = {
            ex : function (obj) {
                t.same(obj, 1234);
            }
        };
        vm.runInNewContext(src, c);
    });
});
