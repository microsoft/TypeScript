var mdeps = require('../');
var test = require('tap').test;
var path = require('path');
var fs = require('fs');

test('invalid pkg', function (t) {
    var d = mdeps();
    d.on('package', function (pkg_) {
//        console.error({pkg_});
    });
    d.end(path.join(__dirname, '/invalid_pkg/file.js'));
    d.on('data', function () {});
    d.on('end', function () {
      t.end();
    });
});
