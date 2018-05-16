var test = require('tape');
var vm = require('vm');
var concat = require('concat-stream');

var path = require('path');
var insert = require('../');
var bpack = require('browser-pack');
var mdeps = require('module-deps');

test('insert globals', function (t) {
    var expected = [ 'global' ];
    t.plan(2 + expected.length);
    
    var deps = mdeps()
    var pack = bpack({ raw: true });
    
    deps.pipe(pack);
    
    pack.pipe(concat(function (src) {
        var c = {
            t : t,
            a : 555,
        };
        c.self = c;
        vm.runInNewContext(src, c);
    }));
    
    deps.write({
        transform: function (file) {
            var tr = inserter(file)
            tr.on('global', function (name) {
                t.equal(name, expected.shift());
            });
            return tr;
        },
        global: true
    });
    deps.end(__dirname + '/global/main.js');
});

test('__filename and __dirname', function (t) {
    t.plan(2);
    
    var file = path.join(__dirname, 'global', 'filename.js');
    var deps = mdeps()
    var pack = bpack({ raw: true });
    
    deps.pipe(pack);
    
    pack.pipe(concat(function (src) {
        var c = {};
        vm.runInNewContext('require=' + src, c);
        var x = c.require(file);
        t.equal(x.filename, '/filename.js');
        t.equal(x.dirname, '/');
    }));
    
    deps.write({ transform: inserter, global: true });
    deps.end(file);
});

function inserter (file) {
    return insert(file, { basedir: __dirname + '/global' });
}
