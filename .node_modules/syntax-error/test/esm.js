var test = require('tap').test;

var fs = require('fs');
var check = require('../');

var file = __dirname + '/sources/esm.js';
var src = fs.readFileSync(file);

test('esm with sourceType script', function (t) {
    var err = check(src, file);
    t.ok(err);
    t.equal(err.line, 1);
    t.equal(err.column, 1);
    t.equal(err.message, "'import' and 'export' may appear only with 'sourceType: module'");
    t.ok(String(err).indexOf(file + ':1'));
    t.end();
});

test('esm with sourceType module', function (t) {
    var err = check(src, file, { sourceType: 'module' });
    t.notOk(err);
    t.end();
});
