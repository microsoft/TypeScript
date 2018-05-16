var test = require('tape');
var mdeps = require('module-deps');
var bpack = require('browser-pack');
var insert = require('../');
var concat = require('concat-stream');
var vm = require('vm');

test('isbuffer', function (t) {
    t.plan(5);
    var deps = mdeps()
    var pack = bpack({ raw: true, hasExports: true });
    deps.pipe(pack).pipe(concat(function (src) {
        var c = { global: {} };
        vm.runInNewContext(src, c);
        t.equal(c.require('main')(Buffer('wow')), true, 'is a buffer');
        t.equal(c.require('main')('wow'), false, 'not a buffer (string)');
        t.equal(c.require('main')({}), false, 'not a buffer (object)');
        t.notOk(/require("buffer")/.test(src), 'buffer not required in source')
        t.notOk(/require\("\//.test(src), 'absolute path not required in source')
    }));
    deps.write({ transform: inserter, global: true });
    deps.end({ id: 'main', file: __dirname + '/isbuffer/main.js' });
});

function inserter (file) {
    return insert(file, { basedir: __dirname + '/isbuffer' });
}
