var browserify = require('../');
var test = require('tap').test;
var vm = require('vm');

test('require same file locally and globally', function (t) {
    t.plan(2);

    var b = browserify(__dirname + '/multi_require/main.js', {
        basedir: __dirname
    });
    b.require('./multi_require/a.js', {expose: 'a'});

    b.bundle(function (err, src) {
        t.ifError(err);
        var c = {t: t};
        vm.runInNewContext(src, c);
    });
});
