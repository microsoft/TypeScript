var pipeline = require('../');
var through = require('through2');
var stringify = require('JSONStream').stringify;
var split = require('split');
var concat = require('concat-stream');
var test = require('tape');

test('multiunshift', function (t) {
    t.plan(1);
    
    var a = split();
    var b = through.obj(function (row, enc, next) {
        this.push(JSON.parse(row));
        next();
    });
    var c = through.obj(function (row, enc, next) { this.push(row.x); next() });
    var d = through.obj(function (x, enc, next) { this.push(x * 111); next() });
    var e = stringify();
    
    var stream = pipeline();
    stream.unshift(d, e);
    stream.unshift(a, b, c);
    stream.pipe(concat(function (body) {
        t.deepEqual(body.toString(), '[\n333\n,\n444\n,\n555\n]\n');
    }));
    
    stream.write('{"x":3}\n');
    stream.write('{"x":4}\n');
    stream.write('{"x":5}');
    stream.end();
});
