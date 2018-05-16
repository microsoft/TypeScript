var pipeline = require('../');
var through = require('through2');
var split = require('split');
var concat = require('concat-stream');
var test = require('tape');

test('splice', function (t) {
    var expected = {};
    expected.replacer = [ '333', '444', '5000', '6000' ];
    expected.d = [ 3, 4 ];
    expected.thousander = [ 5, 6 ];
    
    t.plan(4 + 2 + 2 + 1);
    
    var a = split();
    var b = through.obj(function (row, enc, next) {
        this.push(JSON.parse(row));
        next();
    });
    var c = through.obj(function (row, enc, next) {
        this.push(row.x);
        next();
    });
    var d = through.obj(function (x, enc, next) {
        t.equal(x, expected.d.shift(), 'd');
        this.push(String(x * 111));
        next();
    });
    var thousander = through.obj(function (x, enc, next) {
        t.equal(x, expected.thousander.shift(), 'thousander');
        this.push(String(x * 1000));
        next();
    });
    
    var replacer = through(function (buf, enc, next) {
        var ex = expected.replacer.shift();
        t.equal(buf.toString(), ex);
        if (expected.replacer.length === 2) {
            stream.splice(3, 1, thousander);
        }
        this.push(buf.toString('hex') + '\n');
        next();
    });
    
    var stream = pipeline([ a, b, c, d, replacer ]);
    stream.pipe(concat(function (body) {
        t.deepEqual(
            body.toString(),
            '333333\n343434\n35303030\n36303030\n'
        );
    }));
    
    stream.write('{"x":3}\n');
    stream.write('{"x":4}\n');
    stream.write('{"x":5}\n');
    stream.write('{"x":6}');
    stream.end();
});
