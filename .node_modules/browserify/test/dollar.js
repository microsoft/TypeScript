var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('dollar', function (t) {
    t.plan(2);
    var b = browserify();
    b.require(__dirname + '/dollar/dollar/index.js', { expose: 'dollar' });
    b.bundle(function (err, src) {
        t.ok(src.length > 0);
        
        var c = {};
        vm.runInNewContext(src, c);
        var res = vm.runInNewContext('require("dollar")(100)', c);
        t.equal(res, 10000);
    });
});
