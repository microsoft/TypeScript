var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('five bundle', function (t) {
    t.plan(3+4*2);
    
    var b = browserify(__dirname + '/entry/main.js');
    var source;
    
    b.bundle(function (err, src0) {
        t.ifError(err);
        var c = {
            done : function (one, two) {
                t.equal(one, 1);
                t.equal(two, 2);
            }
        };
        vm.runInNewContext(src0, c);
        
        (function next (count) {
            if (count === 5) return;
            b.bundle(function (err, src1) {
                t.ifError(err);
                t.equal(src1.toString('utf8'), src0.toString('utf8'));
                next(count+1);
            });
        })(1);
    });
});
