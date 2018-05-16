var test = require('tape')
var mdeps = require('module-deps');
var bpack = require('browser-pack');
var insert = require('../');
var concat = require('concat-stream');
var vm = require('vm');

test('always true insert', function (t) {
    t.plan(10);
    var s = mdeps({
        modules: {
            buffer: require.resolve('buffer/')
        }
    });
    s.pipe(bpack({ raw: true })).pipe(concat(function (src) {
        var c = {
            t: t,
            process: 'sandbox process',
            Buffer: 'sandbox Buffer',
            __filename: 'sandbox __filename',
            __dirname: 'sandbox __dirname',
            custom: 'sandbox custom',
            self: { xyz: 555 }
        };
        vm.runInNewContext(src, c);
    }));
    s.write({ transform: inserter({ always: true }), global: true });
    s.end(__dirname + '/always/main.js');
});

test('always true insert custom globals without defaults', function (t) {
    t.plan(7);
    var s = mdeps({
        modules: {
            buffer: require.resolve('buffer/')
        }
    });
    s.pipe(bpack({ raw: true })).pipe(concat(function (src) {
        var c = {
            t: t,
            process: 'sandbox process',
            Buffer: 'sandbox Buffer',
            __filename: 'sandbox __filename',
            __dirname: 'sandbox __dirname',
            custom: 'sandbox custom',
            self: { xyz: 555 }
        };
        vm.runInNewContext(src, c);
    }));
    s.write({
        transform: inserter({ always: true, vars: {
            global: {},
            process: undefined,
            Buffer: undefined,
            __filename: undefined,
            __dirname: undefined,
            custom: function() { return '"inserted custom"' }
        }}),
        global: true
    });
    s.end(__dirname + '/always/custom_globals_without_defaults.js');
});

test('always truthy-but-not-true insert hidden from quick test is not really inserted; true is', function (t) {
    t.plan(2);
    var testit = function(always, expected) {
        var s = mdeps({
            modules: {
                buffer: require.resolve('buffer/')
            }
        });
        s.pipe(bpack({ raw: true })).pipe(concat(function (src) {
            var c = {
                t: t,
                process: 'sandbox process',
                Buffer: 'sandbox Buffer',
                __filename: 'sandbox __filename',
                __dirname: 'sandbox __dirname',
                custom: 'sandbox custom',
                expected: expected,
                self: { xyz: 555 }
            };
            vm.runInNewContext(src, c);
        }));
        s.write({
            transform: inserter({ always: always, vars: {
                custom: function() { return '"inserted custom"' }
            }}),
            global: true
        })
        s.end(__dirname + '/always/hidden_from_quick_test.js');
    };

    var always = 'truthy', expected = 'sandbox custom';
    testit(always, expected);

    always = true; expected = 'inserted custom';
    testit(always, expected);
});

function inserter (opts) {
    return function (file) {
        return insert(file, opts);
    };
}
