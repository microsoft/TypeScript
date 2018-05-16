var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('implicit process global', function (t) {
    t.plan(2);
    
    var b = browserify(__dirname + '/process/main.js');
    b.bundle(function (err, src) {
        var c = {
            done : function (one, two) {
                t.equal(one, 1);
                t.equal(two, 2);
                t.end();
            },
            setTimeout: setTimeout,
            clearTimeout: clearTimeout
        };
        vm.runInNewContext(src, c);
    });
});
