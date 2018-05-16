var test = require('tap').test;
var browserify = require('../');
var through = require('through2');
var vm = require('vm');

test('bundle external global', function (t) {
    t.plan(1);
    
    var stream = through();
    stream.push('console.log(process)');
    stream.push(null);
    
    var b = browserify({ bundleExternal: false });
    b.add(stream);
    b.bundle(function (err, src) {
        vm.runInNewContext(src, {
            console: { log: log },
            process: process
        });
        function log (msg) {
            t.equal(msg, process);
        }
    });
});
