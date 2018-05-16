var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;
var through = require('through2');

test('global transform precedence', function (t) {
    t.plan(1);
    
    var b = browserify(__dirname + '/tr_global/main.js', {
        basedir: __dirname + '/tr_global'
    });
    b.transform('tr', { global: true });
    b.bundle(function (err, src) {
        vm.runInNewContext(src, { console: { log: log } });
        function log (msg) { t.equal(msg, 444) }
    });
});
