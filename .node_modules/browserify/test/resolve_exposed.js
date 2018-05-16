var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('resolve exposed files', function (t) {
    t.plan(2);
    
    var b = browserify(__dirname + '/resolve_exposed/main.js', {
        basedir: __dirname + '/resolve_exposed'
    });
    b.require('./x.js', { expose: 'xyz' });
    b.bundle(function (err, src) {
        t.ifError(err);
        var c = { console: { log: log } };
        vm.runInNewContext(src, c);
        function log (x) {
            t.equal(x, 333);
        }
    });
});
