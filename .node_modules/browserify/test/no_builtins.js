var browserify = require('../');
var test = require('tap').test;
var path = require('path');
var vm = require('vm');

test('builtins false', function (t) {
    t.plan(1);

    var file = __dirname + '/no_builtins/main.js';
    var b = browserify({
        entries: [ file ],
        commondir: false,
        builtins: false
    });
    b.bundle(function (err, src) {
        var c = {
            console: { log: function (msg) {
                t.equal(msg, 'beep boop\n');
            } },
            require: require,
            __dirname: process.cwd()
        };
        vm.runInNewContext(src, c);
    });
});

test('builtins []', function (t) {
    t.plan(1);
    var b = browserify({
        entries: [ __dirname + '/no_builtins/main.js' ],
        commondir: false,
        builtins: []
    });
    b.bundle(function (err, src) {
        var c = {
            console: { log: function (msg) {
                t.equal(msg, 'beep boop\n');
            } },
            require: require
        };
        vm.runInNewContext(src, c);
    });
});

test('builtins object', function (t) {
    t.plan(2);
    var b = browserify({
        entries: [ __dirname + '/no_builtins/main.js' ],
        commondir: false,
        builtins: {
            fs: require.resolve('./no_builtins/extra/fs.js'),
            tls: require.resolve('./no_builtins/extra/tls.js')
        }
    });
    var expected = [
        'WRITE CODE EVERY DAY',
        'WHATEVER'
    ];
    b.bundle(function (err, src) {
        var c = { console: { log: log }, require: require };
        function log (msg) {
            t.equal(msg, expected.shift());
        }
        vm.runInNewContext(src, c);
    });
});
