var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('hash', function (t) {
    t.plan(3);
    
    var b = browserify(__dirname + '/hash/main.js');
    b.bundle(function (err, buf) {
        var c = { t: t };
        var src = buf.toString('utf8');
        t.equal(src.match(RegExp('// FILE CONTENTS', 'g')).length, 1);
        vm.runInNewContext(src, c);
    });
});
