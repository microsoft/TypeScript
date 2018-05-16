var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('double bundle error', function (t) {
    t.plan(2);
    
    var b = browserify(__dirname + '/double_bundle_error/main.js');
    var x = b.bundle();
    x.on('error', function (err) {
        t.ok(err);
        var y = b.bundle();
        y.on('error', function (err) {
            t.ok(err);
        });
    });
});
