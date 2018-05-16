var parser = require('../');
var test = require('tap').test;
var through = require('through2');
var path = require('path');

// Test that p.options.expose is defined and that the row is properly exposed
// (resolved to the absolute pathname corresponding to the `file` value passed
// in the row, and set in opts.expose).
test('row is exposed', function (t) {
    t.plan(1);
    var common_path = path.join(__dirname, '/files/main');
    var opts = { expose: {} };
    var p = parser(opts);
    // Note pathname without extension.
    p.end({ file: common_path, expose: "whatever" });
    p.on('error', t.fail.bind(t));

    p.pipe(through.obj());

    p.on('end', function () {
        // Note pathname with extension.
        t.equal(opts.expose.whatever, common_path + '.js');
    });
});
