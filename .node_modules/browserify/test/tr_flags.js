var through = require('through2');
var browserify = require('../');
var test = require('tap').test;
var vm = require('vm');

test('--debug passed to transforms', function (t) {
    var empty = require.resolve('../lib/_empty');

    t.plan(3);

    [true, false].forEach(function(debug) {
        var b = browserify(empty, { debug: debug });

        b.transform(function(file, opts) {
            t.equal(opts._flags.debug, debug, 'debug: ' + debug);
            return through();
        });

        b.bundle(function (err, src) {
            if (err) return t.fail(err.message);
        });
    });

    var b = browserify(empty, { debug: true });

    b.transform({
        _flags: Infinity
    }, function(file, opts) {
        t.equal(opts._flags, Infinity, 'transform arguents are preserved');
        return through();
    });

    b.bundle(function(err, src) {
        if (err) return t.fail(err.message);
    });
});
