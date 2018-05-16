var browserify = require('../');
var test = require('tap').test;
var util = require('util');
var vm = require('vm');

test('util.inspect', function (t) {
    t.plan(1);
    
    var b = browserify();
    b.require('util');
    b.bundle(function (err ,src) {
        var c = {};
        vm.runInNewContext(src, c);
        t.equal(
            c.require('util').inspect([1,2,3]),
            util.inspect([1,2,3])
        );
    });
});

test('util.inherits', function (t) {
    t.plan(2);
    
    var b = browserify();
    b.require('util');
    b.require('events');
    
    b.bundle(function (err, src) {
        var c = {};
        vm.runInNewContext(src, c);
        var EE = c.require('events').EventEmitter;
        
        function Beep () {}
        c.require('util').inherits(Beep, EE);
        var beep = new Beep;
        
        t.ok(beep instanceof Beep);
        t.ok(beep instanceof EE);
    });
});

test('util.inherits without Object.create', function (t) {
    t.plan(2);
    var b = browserify();
    b.require('util');
    b.require('events');
    
    b.bundle(function (err, src) {
        var c = { Object : { prototype: Object.prototype } };
        vm.runInNewContext(src, c);
        var EE = c.require('events').EventEmitter;
        
        function Beep () {}
        Beep.prototype = {};
        
        c.require('util').inherits(Beep, EE);
        var beep = new Beep;
        
        t.ok(beep instanceof Beep);
        t.ok(beep instanceof EE);
    });
});
