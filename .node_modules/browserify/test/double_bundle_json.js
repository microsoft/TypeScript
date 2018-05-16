var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;
var through = require('through2');
var xtend = require('xtend');

test('double bundle json', function (t) {
    t.plan(6);
    var expected0 = [ 'a=500', 'b=500' ];
    var expected1 = [ 'a=500', 'b=500' ];
    
    function log0 (msg) { t.equal(msg, expected0.shift()) }
    function log1 (msg) { t.equal(msg, expected1.shift()) }
    
    var cache = {};
    var b = browserify(__dirname + '/double_bundle_json/index.js', {
        cache: cache
    });
    b.pipeline.get('deps').push(through.obj(function(row, enc, next) {
        cache[row.file] = {
            source: row.source,
            deps: xtend(row.deps)
        };
        this.push(row);
        next();
    }));
    b.bundle(function (err, src0) {
        t.ifError(err);
        vm.runInNewContext(src0, { console: { log: log0 } });
        delete cache[__dirname + '/double_bundle_json/index.js'];
        
        b.bundle(function (err, src1) {
            t.ifError(err);
            vm.runInNewContext(src1, { console: { log: log1 } });
        });
    });
});
