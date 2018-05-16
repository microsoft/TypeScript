var test = require('tape');
var mdeps = require('module-deps');
var bpack = require('browser-pack');
var insert = require('../');
var concat = require('concat-stream');
var path = require('path');
var fs = require('fs');
var vm = require('vm');

test('windows partitions', { skip: process.platform !== 'win32' }, function (t) {
    t.plan(1);
    var deps = mdeps()
    var pack = bpack({ raw: true, hasExports: true });
    deps.pipe(pack).pipe(concat(function (src) {
        var c = {
            console: { log: log }
        };
        vm.runInNewContext(src, c);
        function log (value) {
            t.equal(typeof value, 'function');
        }
    }));
    deps.write({ transform: inserter, global: true });
    deps.end({
        id: 'main',
        file: 'D:\\test.js',
        source: fs.readFileSync(__dirname + '/roots/main.js')
    });
});

function inserter (file) {
    return insert(file, {
        basedir: path.join(__dirname, '..')
    });
}
