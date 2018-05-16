var browserify = require('../');
var test = require('tap').test;

test('bundle in debug mode', function (t) {
    t.plan(3);
    
    var b = browserify({ debug: true });
    b.require('seq');
    b.bundle(function (err, buf) {
        var src = buf.toString('utf8');
        var secondtolastLine = src.split('\n').slice(-2);

        t.ok(typeof src === 'string');
        t.ok(src.length > 0);
        t.ok(/^\/\/# sourceMappingURL=/.test(secondtolastLine), 'includes sourcemap');
    });
});

test('bundle in non debug mode', function (t) {
    t.plan(3);
        
    var b = browserify();
    b.require('seq');
    b.bundle(function (err, buf) {
        var src = buf.toString('utf8');
        var secondtolastLine = src.split('\n').slice(-2);
        
        t.ok(typeof src === 'string');
        t.ok(src.length > 0);
        t.notOk(/^\/\/# sourceMappingURL=/.test(secondtolastLine), 'includes no sourcemap');
    });
});
