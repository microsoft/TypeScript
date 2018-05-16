var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('subdep', function (t) {
    t.plan(1);
    
    var b = browserify();
    b.require(__dirname + '/subdep/index.js', { expose: 'subdep' });
    
    b.bundle(function (err, src) {
        var c = {};
        vm.runInNewContext(src, c);
        t.equal(c.require('subdep'), 'zzz');
    });
});
