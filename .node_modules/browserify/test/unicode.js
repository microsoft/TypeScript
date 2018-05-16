var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('unicode entry', function (t) {
    t.plan(2);
    
    var b = browserify(__dirname + '/unicode/main.js');
    b.bundle(function (err, src) {
        var c = {
            done : function (one, two) {
                t.equal(one, 1);
                t.equal(two, 2);
                t.end();
            }
        };
        vm.runInNewContext(src, c);
    });
});
