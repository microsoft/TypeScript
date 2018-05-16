var test = require('tape');
var vm = require('vm');
var concat = require('concat-stream');

var path = require('path');
var insert = require('../');
var bpack = require('browser-pack');
var mdeps = require('module-deps');

test('unprefix - remove shebang and bom', function (t) {
    t.plan(3);
    
    var file = path.join(__dirname, 'unprefix', 'main.js');
    var deps = mdeps();
    var pack = bpack({ raw: true });
    
    deps.pipe(pack);
    
    pack.pipe(concat(function (src) {
        var c = {};
        vm.runInNewContext('require=' + src, c);
        var x = c.require(file);
        t.equal(x.filename, '/hello.js');
        t.equal(x.dirname, '/');
        t.notOk(/\ufeff/.test(src.toString()));
    }));
    
    deps.write({ transform: inserter, global: true });
    deps.end(file);
});

function inserter (file) {
    return insert(file, { basedir: __dirname + '/unprefix' });
}
