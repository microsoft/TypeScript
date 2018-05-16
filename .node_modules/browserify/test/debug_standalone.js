var test = require('tap').test;
var browserify = require('../');
var through = require('through2');
var vm = require('vm');

test('ordinary debug', function (t) {
    t.plan(1);
    
    var stream = through();
    stream.push('console.log(1+2)');
    stream.push(null);
    
    var b = browserify({ debug: true });
    b.add(stream);
    b.bundle(function (err, buf) {
        var src = buf.toString('utf8');
        var last = src.split('\n').slice(-2)[0];
        t.ok(
            /\/\/# sourceMappingURL=data:application\/json;charset=utf-8;base64,[\w+\/=]+$/
            .test(last)
        );
    });
});

test('debug standalone', function (t) {
    t.plan(1);
    
    var stream = through();
    stream.push('console.log(1+2)');
    stream.push(null);
    
    var b = browserify({ debug: true, standalone: 'xyz' });
    b.add(stream);
    b.bundle(function (err, buf) {
        var src = buf.toString('utf8');
        var last = src.split('\n').slice(-2)[0];
        t.ok(
            /\/\/# sourceMappingURL=data:application\/json;charset=utf-8;base64,[\w+\/=]+$/
            .test(last)
        );
    });
});

test('debug standalone exposed', function (t) {
    t.plan(2);
    
    var stream = through();
    stream.push('console.log(1+2)');
    stream.push(null);
    
    var b = browserify({ debug: true, standalone: 'xyz' });
    b.require(__dirname + '/debug_standalone/x.js', { expose: 'xxx' });
    b.bundle(function (err, buf) {
        var src = buf.toString('utf8');
        var last = src.split('\n').slice(-2)[0];
        t.ok(
            /\/\/# sourceMappingURL=data:application\/json;charset=utf-8;base64,[\w+\/=]+$/
            .test(last)
        );
        var c = { window: {} };
        vm.runInNewContext(src, c);
        t.equal(c.window.xyz, 555);
    });
});
