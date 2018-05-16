var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('fake', function (t) {
    t.plan(1);
    
    var b = browserify();
    b.require(__dirname + '/fake/fake_fs.js', { expose: 'fs' });
    b.add(__dirname + '/fake/main.js');
    b.bundle(function (err, src) {
        var c = { t: t };
        vm.runInNewContext(src, c);
    });
});
