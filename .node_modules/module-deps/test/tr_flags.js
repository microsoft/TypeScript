var through = require('through2');
var mdeps = require('../');
var test = require('tap').test;

test('--debug passed to transforms', function (t) {
    var empty = require.resolve('./tr_flags/empty.js');

    t.plan(5);

    var p
    [true, false].forEach(function(debug) {
        p = mdeps({
            debug: debug,
            transform: function (file, opts) {
              t.equal(opts._flags.debug, debug, 'debug: ' + debug);
              return through();
            }
        })
        p.on('error', function (err) { return t.fail(err.message) })
        p.end(empty);

        p = mdeps({ debug: debug })
        p.write({
            transform: function (file, opts) {
                t.equal(opts._flags.debug, debug, 'debug: ' + debug);
                return through();
            },
            options: {}
        })
        p.on('error', function (err) { return t.fail(err.message) })
        p.end(empty);
    });

    p = mdeps({ debug: true })
    p.write({
        transform: function (file, opts) {
            t.equal(opts._flags, Infinity, 'transform arguments are preserved');
            return through();
        },
        options: { _flags: Infinity }
    })
    p.on('error', function (err) { return t.fail(err.message) })
    p.end(empty);
});
