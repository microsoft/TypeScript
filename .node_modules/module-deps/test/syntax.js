var mdeps = require('../');
var test = require('tap').test;
var JSONStream = require('JSONStream');
var packer = require('browser-pack');
var through = require('through2');
var path = require('path');

test('syntax error', function (t) {
    t.plan(2);
    var input = path.join(__dirname, '/files/syntax_error.js');
    // ensure transformDeps functionality does not break when parse errors happen
    // see https://github.com/browserify/module-deps/commit/9fe46d5#commitcomment-28273437
    var p = mdeps({
        transform: function () { return through(); }
    });
    p.on('file', function (file) {
        t.equal(file, input, 'should emit a file event even if there was an error');
    });
    p.on('error', function (err) {
        t.ok(err);
    });
    p.end(input);
});
