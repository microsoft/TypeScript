var browserify = require('../');
var path = require('path');
var vm = require('vm');
var test = require('tap').test;

var expected = [
    readpkg('pkg_event'),
    readpkg('pkg_event/node_modules/aaa'),
    readpkg('pkg_event/node_modules/aaa/lib')
];

test('package event', function (t) {
    t.plan(2 + expected.length);
    
    var b = browserify(__dirname + '/pkg_event/main.js');
    b.on('package', function (pkg) {
        t.deepEqual(pkg, expected.shift());
    });
    
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (msg) { t.equal(msg, 555) }
    });
});

function readpkg (dir) {
    var pkg = require(path.join(__dirname, dir, 'package.json'));
    pkg.__dirname = path.join(__dirname, dir);
    return pkg;
}
