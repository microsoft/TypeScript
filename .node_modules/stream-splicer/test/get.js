var pipeline = require('../');
var through = require('through2');
var test = require('tape');

test('get', function (t) {
    var a = through.obj();
    var b = through.obj();
    var c = through.obj();
    
    var pipe = pipeline([ a, b, c ]);
    t.equal(pipe.get(0), a, '0');
    t.equal(pipe.get(1), b, '1');
    t.equal(pipe.get(2), c, '2');
    t.equal(pipe.get(3), undefined, '3');
    t.equal(pipe.get(4), undefined, '4');
    t.equal(pipe.get(5), undefined, '5');
    t.equal(pipe.get(-1), c, '-1');
    t.equal(pipe.get(-1), c, '-1');
    t.equal(pipe.get(-2), b, '-2');
    t.equal(pipe.get(-3), a, '-3');
    t.equal(pipe.get(-4), undefined, '-4');
    t.equal(pipe.get(-5), undefined, '-5');
    t.end();
});

test('nested get', function (t) {
    var a = through.obj();
    var b = through.obj();
    var c = through.obj();
    var d = through.obj();
    var e = through.obj();
    var f = through.obj();
    var g = through.obj();
    
    var pipe = pipeline([ a, [ b, c, [ d, [ e ], f ] ], g ]);
    t.equal(pipe.get(0), a);
    t.equal(pipe.get(1, -1, 1, 0), e);
    t.equal(pipe.get(1, 3), undefined);
    t.equal(pipe.get(4, 3), undefined);
    t.end();
});
