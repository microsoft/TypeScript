var pipeline = require('../');
var through = require('through2');
var split = require('split');
var concat = require('concat-stream');
var test = require('tape');

test('pop', function (t) {
    var expected = {};
    expected.replacer = [ '333', '444' ];
    
    t.plan(3);
    
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
        this.push(String(x * 111));
        next();
    });
    var replacer = through(function (buf, enc, next) {
        var ex = expected.replacer.shift();
        t.equal(buf.toString(), ex);
        this.push(buf.toString('hex') + '\n');
        if (expected.replacer.length === 0) {
            stream.pop();
        }
        next();
    });
    
    var stream = pipeline([ a, b, c, d, replacer ]);
    stream.pipe(concat(function (body) {
        t.deepEqual(body.toString(), '333333\n343434\n555666');
    }));
    
    stream.write('{"x":3}\n');
    stream.write('{"x":4}\n');
    stream.write('{"x":5}\n');
    stream.write('{"x":6}');
    stream.end();
});
