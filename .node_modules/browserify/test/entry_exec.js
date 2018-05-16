var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('only execute entry files', function (t) {
    t.plan(1);
    
    var b = browserify();
    b.add(__dirname + '/entry_exec/main.js');
    b.require(__dirname + '/entry_exec/fail.js');
    b.bundle(function (err, src) {
        var c = { t: t };
        vm.runInNewContext(src, c);
    });
});
