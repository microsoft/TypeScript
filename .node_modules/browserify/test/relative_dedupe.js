var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('relative dedupe', function (t) {
    var expected = [ 'a a', 'a b', 'b a', 'b b' ];
    t.plan(expected.length + 1);
    
    var b = browserify(__dirname + '/relative_dedupe/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        var c = { console: { log: log } };
        vm.runInNewContext(src, c);
    });
    
    function log (msg) { t.equal(msg, expected.shift()) }
});
