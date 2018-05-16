var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('$NODE_PATHS', function (t) {
    t.plan(3);
    var paths = [ __dirname + '/paths/x', __dirname + '/paths/y' ];
    var sep = /^win/i.test(process.platform) ? ';' : ':';
    
    process.env.NODE_PATH = (process.env.NODE_PATHS || '')
        .split(sep).concat(paths).join(sep)
    ;
    
    var b = browserify(__dirname + '/paths/main.js');
    b.bundle(function (err, src) {
        if (err) t.fail(err);
        vm.runInNewContext(src, { t: t });
    });
});

test('opts.paths', function (t) {
    t.plan(3);
    
    var b = browserify({
        paths: [ __dirname + '/paths/x', __dirname + '/paths/y' ],
        entries: __dirname + '/paths/main.js'
    });
    b.bundle(function (err, src) {
        if (err) t.fail(err);
        vm.runInNewContext(src, { t: t });
    });
});
