var test = require('tape');
var detect = require('../');
var fs = require('fs');
var src = {
    call: fs.readFileSync(__dirname + '/files/buffer_call.js'),
    isbuffer: fs.readFileSync(__dirname + '/files/buffer_isbuffer.js'),
    v: fs.readFileSync(__dirname + '/files/buffer_var.js')
};

test('implicit props: call', function (t) {
    t.plan(3);
    var scope = detect(src.call);
    t.deepEqual(scope.locals, { '': [] });
    t.deepEqual(scope.globals.implicit, [ 'console', 'Buffer' ]);
    t.deepEqual(scope.globals.implicitProperties, {
        console: [ 'log' ],
        Buffer: [ '()' ]
    })
});

test('implicit props: isBuffer', function (t) {
    t.plan(3);
    var scope = detect(src.isbuffer);
    t.deepEqual(scope.locals, { '': [] });
    t.deepEqual(scope.globals.implicit, [ 'console', 'Buffer' ]);
    t.deepEqual(scope.globals.implicitProperties, {
        console: [ 'log' ],
        Buffer: [ 'isBuffer' ]
    })
});

test('implicit props: var', function (t) {
    t.plan(3);
    var scope = detect(src.v);
    t.deepEqual(scope.locals, { '': [] });
    t.deepEqual(scope.globals.implicit, [ 'console', 'Buffer' ]);
    t.deepEqual(scope.globals.implicitProperties, {
        console: [ 'log' ],
        Buffer: [ '*' ]
    })
});
