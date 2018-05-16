var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;
var through = require('through2');

test('deps pipeline', function (t) {
    t.plan(1);
    
    var b = browserify(__dirname + '/pipeline_deps/main.js');
    b.pipeline.get('deps').push(through.obj(function (row, enc, next) {
        row.source = row.source.replace(/111/g, '11111');
        this.push(row);
        next();
    }));
    
    b.bundle(function (err, src) {
        Function([ 'console' ], src)({ log: log });
        function log (msg) {
            t.equal(msg, 'main: 56055');
        }
    });
});
