var browserify = require('../');
var test = require('tap').test;
var vm = require('vm');

test('identical', function (t) {
    var expected = [ 1, 2, 10, 110 ];
    t.plan(expected.length + 1);
    
    var b = browserify(__dirname + '/identical_different/main.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src.toString('utf8'), {
            console: { log: log }
        });
        function log (msg) {
            t.equal(msg, expected.shift());
        }
    });
});
