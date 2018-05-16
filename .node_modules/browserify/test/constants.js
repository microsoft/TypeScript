var browserify = require('../');
var test = require('tap').test;
var vm = require('vm');
var through = require('through2');

test('constants', function (t) {
    t.plan(2);
    var stream = through();
    stream.push('console.log(require("constants").ENOENT)');
    stream.push(null);
    var b = browserify(stream);
    
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (msg) { t.equal(msg, 2) }
    });
});
