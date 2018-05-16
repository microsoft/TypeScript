var pipeline = require('../');
var through = require('through2');
var test = require('tape');

test('shift', function (t) {
    var expected = {};
    expected.a = [ 3, 4 ];
    expected.b = [ 300, 400, 5, 6 ];
    expected.c = [ 310, 410, 15, 16 ];
    expected.output = [ 155, 205, 15/2, 8 ];
    
    t.plan(2 + 4 + 4 + 4);
    
    var a = through.obj(function (x, enc, next) {
        var ex = expected.a.shift();
        t.equal(x, ex, 'a');
        this.push(x * 100);
        next();
    });
    var b = through.obj(function (x, enc, next) {
        var ex = expected.b.shift();
        t.equal(x, ex, 'b');
        if (expected.b.length === 2) p.shift()
        this.push(x + 10);
        next();
    });
    var c = through.obj(function (x, enc, next) {
        var ex = expected.c.shift();
        t.equal(x, ex, 'c');
        this.push(x / 2);
        next();
    });
    
    var p = pipeline.obj([ a, b, c ]);
    p.pipe(through.obj(function (x, enc, next) {
        var ex = expected.output.shift();
        t.equal(x, ex);
        next();
    }));
    
    p.write(3);
    p.write(4);
    p.write(5);
    p.write(6);
    p.end();
});
