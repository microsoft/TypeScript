var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;
var path = require('path');

var pkg = require('./pkg/package.json');
pkg.__dirname = path.join(__dirname, 'pkg');

test('package', function (t) {
    t.plan(2);
    
    var b = browserify(__dirname + '/pkg/main.js');
    b.on('package', function (pkg_) {
        t.deepEqual(pkg_, pkg);
    });
    
    b.bundle(function (err) {
        t.ifError(err);
    });
});
