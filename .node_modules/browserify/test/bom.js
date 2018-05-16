var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('byte order marker', function (t) {
    t.plan(2);
    
    var b = browserify(__dirname + '/bom/hello.js');
    b.bundle(function (err, src) {
        if (err) t.fail(err);
        var c = {
            console: { log: function (msg) {
                t.equal(msg, 'hello');
            } }
        };
        vm.runInNewContext(src, c);
        t.notOk(/\ufeff/.test(src.toString('utf8')));
    });
});
