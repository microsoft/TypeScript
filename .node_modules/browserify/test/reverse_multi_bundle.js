/**
 * To be able to lazy load bundles with script loaders the loaded bundles
 * must have access to modules exposed by previous bundles.
 *
 * In effect this is the same as adding the bundles in reverse order
 **/

var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('reverse multi bundle', function (t) {
    t.plan(5);

    // Main app bundle has the main app code and the shared libarary code
    var app = browserify([__dirname + '/reverse_multi_bundle/app.js'])
        .external(__dirname + '/reverse_multi_bundle/lazy.js')
        .require(__dirname + '/reverse_multi_bundle/shared.js', { expose: true })
        .require(__dirname + '/reverse_multi_bundle/arbitrary.js', {expose: 'not/real'});

    // Lazily loaded bundle has only its own code even it uses code from the
    // shared library.
    var lazy = browserify({
            filter: function (id) {
                return id !== 'not/real';
            }
        })
        .require(__dirname + '/reverse_multi_bundle/lazy.js', { expose: true })
        .external(__dirname + '/reverse_multi_bundle/shared.js')
        .external('not/real');


    app.bundle(function (err, appSrc) {
        if (err) throw err;
        lazy.bundle(function(err, lazySrc) {
            if (err) throw err;

            var src = appSrc + ';' + lazySrc;
            var c = {
                setTimeout: setTimeout,
                clearTimeout: clearTimeout,
                t: t
            };
            vm.runInNewContext(src, c);
        });
    });
});
