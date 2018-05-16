var mdeps = require('../');
var test = require('tap').test;
var path = require('path');
var fs = require('fs');

var dirname = path.join(__dirname, '/pkg');

test('pkg', function (t) {
    t.plan(4);
    
    var d = mdeps();
    d.on('package', function (pkg_) {
        var pkg = JSON.parse(fs.readFileSync(dirname + pkg_.dir + '/package.json'));
        pkg.__dirname = path.join(dirname, pkg_.dir);

        t.deepEqual(pkg_, pkg);
    });
    d.end(path.join(__dirname, '/pkg/main.js'));
    d.resume();
});
