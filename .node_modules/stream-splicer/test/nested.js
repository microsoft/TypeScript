var pipeline = require('../');
var through = require('through2');
var split = require('split');
var concat = require('concat-stream');
var test = require('tape');

test('nested splicer', function (t) {
    t.plan(1);
    
    var addNewLines = through(function (buf, enc, next) {
        this.push(buf + '\n');
        next();
    });
    
    var stream = pipeline.obj([
        [ split(), addNewLines ],
        through(function (buf, enc, next) {
            this.push('> ' + buf);
            next()
        })
    ]);
    
    stream.get(0).unshift(through(function (buf, enc, next) {
        this.push(buf.toString('utf8').toUpperCase());
        next();
    }));
    
    stream.pipe(concat(function (body) {
        t.deepEqual(body.toString(), '> A\n> B\n> C\n');
    }));
    
    stream.write('a\n');
    stream.write('b\n');
    stream.write('c');
    stream.end();
});
