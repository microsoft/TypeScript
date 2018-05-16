var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('reset', function (t) {
    t.plan(4);
    
    var b = browserify();
    b.require('path');
    b.bundle(function (err, src) {
        check(err, src);
        b.bundle(function (err, src) {
            check(err, src);
        });
    });
    
    function check (err, src) {
        t.ifError(err);
        var c = {
            setTimeout : setTimeout,
            clearTimeout : clearTimeout,
            console : console
        };
        vm.runInNewContext(src, c);
        
        t.equal(
            c.require('path').join('/a', 'b'),
            '/a/b'
        );
    }
});
