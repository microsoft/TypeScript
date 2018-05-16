var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('requiring a shimmed module name from an external bundle', function (t) {
    t.plan(1);
    var b1 = browserify();
    var b2 = browserify();

    b1.require(__dirname + '/external_shim/bundle1.js', { expose: 'bundle1' });
    b2.external(b1);
    b2.require(__dirname + '/external_shim/bundle2.js', { expose: 'bundle2' });

    b1.bundle(function (err, src1) {
        b2.bundle(function (err, src2) {

            var c = {
                console: console,
                setTimeout: setTimeout,
                clearTimeout: clearTimeout
            };
            vm.runInNewContext(src1 + src2, c);

            t.ok(c.require('bundle1').shim === c.require('bundle2').shim);
        });
    });
});
