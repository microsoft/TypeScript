var test = require('tape');
var mdeps = require('module-deps');
var bpack = require('browser-pack');
var insert = require('../');
var concat = require('concat-stream');
var vm = require('vm');

test('process.nextTick inserts', function (t) {
    t.plan(4);
    var s = mdeps()
    s.pipe(bpack({ raw: true })).pipe(concat(function (src) {
        var c = {
            t: t,
            setTimeout: setTimeout,
            clearTimeout: clearTimeout
        };
        vm.runInNewContext(src, c);
    }));
    s.write({ transform: inserter, global: true })
    s.end(__dirname + '/insert/main.js');
});

test('buffer inserts', function (t) {
    t.plan(2);
    var s = mdeps({
        modules: { buffer: require.resolve('buffer/') }
    });
    s.pipe(bpack({ raw: true })).pipe(concat(function (src) {
        var c = {
            t: t,
            setTimeout: setTimeout,
            clearTimeout: clearTimeout,
            Uint8Array: Uint8Array,
            DataView: DataView
        };
        vm.runInNewContext(src, c);
    }));
    s.write({ transform: inserter, global: true })
    s.end(__dirname + '/insert/buffer.js');
});

function inserter (file) {
    return insert(file, {
        basedir: __dirname + '/insert'
    });
}
