var browserify = require('../');
var vm = require('vm');
var path = require('path');
var test = require('tap').test;
var through = require('through2');

test('delay for pipelines', function (t) {
    t.plan(3);
    
    var b = browserify(__dirname + '/delay/main.js');
    b.pipeline.get('record').push(through.obj(function (row, enc, next) {
        if (row.file) {
            t.equal(row.file, path.join(__dirname, 'delay/main.js'));
            row.file = path.join(__dirname, 'delay/diverted.js');
        }
        this.push(row);
        next();
    }));
    
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (msg) { t.equal(msg, 900) }
    });
});
