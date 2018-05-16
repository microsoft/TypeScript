var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('recorded global tr', function (t) {
    t.plan(6);
    
    var b = browserify(__dirname + '/global_recorder/main.js');
    var context = {
        console: { log: function (msg) { t.equal(msg, 'wow') } }
    };
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, context);
        t.equal(b._recorded.length, 2);
        b.bundle(function (err, src) {
            t.ifError(err);
            vm.runInNewContext(src, context);
            t.equal(b._recorded.length, 2);
        });
    });
});
