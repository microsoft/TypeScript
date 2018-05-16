var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('hash instances with hashed contexts', function (t) {
    t.plan(17);
    
    var b = browserify(__dirname + '/hash_instance_context/main.js');
    b.bundle(function (err, buf) {
        var c = { t: t };
        var src = buf.toString('utf8');
        t.equal(src.match(RegExp('// FILE F ONE', 'g')).length, 1);
        t.equal(src.match(RegExp('// FILE G ONE', 'g')).length, 2);
        
        t.equal(src.match(RegExp('// FILE F TWO', 'g')).length, 1);
        t.equal(src.match(RegExp('// FILE G TWO', 'g')).length, 1);
        t.equal(src.match(RegExp('// FILE H TWO', 'g')).length, 2);
        
        t.equal(src.match(RegExp('// FILE F THREE', 'g')).length, 1);
        t.equal(src.match(RegExp('// FILE G THREE', 'g')).length, 1);
        t.equal(src.match(RegExp('// FILE H THREE', 'g')).length, 1);
        
        vm.runInNewContext(src, c);
    });
});
