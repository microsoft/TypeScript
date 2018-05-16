var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

test('external', function (t) {
    t.plan(2);
    
    var b = browserify(__dirname + '/external/main.js');
    b.external('freelist');
    b.bundle(function (err, src) {
        if (err) return t.fail(err);
        vm.runInNewContext(
            'function require (x) {'
            + 'if (x==="freelist") return function (n) { return n + 1000 }'
            + '}'
            + src,
            { t: t }
        );
    });
});
