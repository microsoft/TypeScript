var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('double bundle parallel', function (t) {
    t.plan(7);
    
    var sources = [];
    var b = browserify(__dirname + '/entry/main.js');
    
    var pending = 2;
    b.bundle(check(0));
    b.bundle(check(1));
    
    function check (index) {
        return function (err, src) {
            t.ifError(err);
            var c = {
                done : function (one, two) {
                    t.equal(one, 1);
                    t.equal(two, 2);
                }
            };
            vm.runInNewContext(src, c);
            sources[index] = src.toString('utf8');
            if (--pending === 0) done();
        };
    }
     
    function done () {
        t.equal(sources[0], sources[1]);
    }
});
