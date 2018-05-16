var test = require('tape');
var splicer = require('../');
var through = require('through2');
var deps = require('module-deps');
var pack = require('browser-pack');
var concat = require('concat-stream');

test('bundle', function (t) {
    t.plan(1);
    
    var pipeline = splicer.obj([
        'deps', [ deps(__dirname + '/bundle/main.js') ],
        'pack', [ pack({ raw: true }) ]
    ]);
    pipeline.pipe(concat(function (body) {
        Function([ 'console' ], body.toString('utf8'))({ log: log });
        function log (msg) {
            t.equal(msg, 'main: 56055');
        }
    }));

    pipeline.get('deps').push(through.obj(function (row, enc, next) {
        row.source = row.source.replace(/111/g, '11111');
        this.push(row);
        next();
    }));
});
