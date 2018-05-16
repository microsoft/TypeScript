var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('multi bundle', function (t) {
    t.plan(5);

    var core = browserify();
    core.require(__dirname + '/multi_bundle/b.js', { expose: true });

    var app = browserify([__dirname + '/multi_bundle/a.js']);
    // inform this bundle that b exists in another bundle
    app.external(__dirname + '/multi_bundle/b.js');

    core.bundle(function (err, src) {
        var c = {
            console: console,
            t : t,
            baton: {
                times: 0
            }
        };

        // loading core will cause no require to run
        vm.runInNewContext(src, c);
        t.equal(c.baton.times, 0);

        // loading the app will require
        app.bundle(function (err, src) {
            vm.runInNewContext(src, c);

            // b required for the first time
            t.equal(c.baton.times, 1);

            // running the file again
            // because it is using the same b, no reloading
            vm.runInNewContext(src, c);

            // b should not have been required again
            // because it was part of the core bundle
            t.equal(c.baton.times, 1);
        });
    });
});

// re-enable this in future releases
test('multi bundle', function (t) {
    t.plan(8);

    var core = browserify({ exposeAll: true });
    core.require(__dirname + '/multi_bundle/a.js', { expose: true });

    var app = browserify([__dirname + '/multi_bundle/c.js']);
    // inform this bundle that b exists in another bundle
    app.external(core);

    core.bundle(function (err, src) {
        var c = {
            console: console,
            t : t,
            baton: {
                times: 0
            }
        };

        // loading core will cause no require to run
        vm.runInNewContext(src, c);
        t.equal(c.baton.times, 0);

        // loading the app will require
        app.bundle(function (err, src) {
            vm.runInNewContext(src, c);

            // b required for the first time
            t.equal(c.baton.times, 1);

            // running the file again
            // because it is using the same b, no reloading
            vm.runInNewContext(src, c);

            // b should not have been required again
            // because it was part of the core bundle
            t.equal(c.baton.times, 1);
        });
    });
});
