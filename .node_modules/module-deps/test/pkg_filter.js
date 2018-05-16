var mdeps = require('../');
var test = require('tap').test;
var JSONStream = require('JSONStream');
var packer = require('browser-pack');
var concat = require('concat-stream');
var path = require('path');

test('pkg filter', function (t) {
    t.plan(3);
    
    var p = mdeps({
        packageFilter: function (pkg) {
            t.equal(pkg.main, 'one.js');
            pkg.main = 'two.js'
            return pkg;
        }
    });
    p.end(path.join(__dirname, '/files/pkg_filter/test.js'));
    
    var pack = packer();
    p.pipe(JSONStream.stringify()).pipe(pack);
    
    pack.pipe(concat(function (src) {
        Function('t', src)(t);
    }));
});
