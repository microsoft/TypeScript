var pipeline = require('../');
var through = require('through2');
var split = require('split');
var concat = require('concat-stream');
var test = require('tape');

test('nested middle splicer', function (t) {
    t.plan(1);
    
    var addNewLines = through(function (buf, enc, next) {
        this.push(buf + '\n');
        next();
    });
    
    var stream = pipeline.obj([
        through.obj(function (str, enc, next) {
            this.push(str.replace(/^./, function (c) {
                return String.fromCharCode(c.charCodeAt(0) + 5);
            }));
            next();
        }),
        [ split(), addNewLines ],
        through(function (buf, enc, next) {
            this.push('> ' + buf);
            next()
        })
    ]);
    
    stream.get(1).unshift(through(function (buf, enc, next) {
        this.push(buf.toString('utf8').toUpperCase());
        next();
    }));
    
    stream.pipe(concat(function (body) {
        t.deepEqual(body.toString(), '> F\n> G\n> H\n');
    }));
    
    stream.write('a\n');
    stream.write('b\n');
    stream.write('c');
    stream.end();
});
