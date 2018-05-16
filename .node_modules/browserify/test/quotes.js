var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;

var hasTemplateLiterals = require('has-template-literals')();

test('quotes', function (t) {
    t.plan(2);

    var b = browserify(__dirname + '/quotes/main.js');
    b.bundle(function (err, src) {
        var c = {
            done : function (single, double) {
                t.equal(single, 'success', 'single quotes');
                t.equal(double, 'success', 'double quotes');
                t.end();
            }
        };
        vm.runInNewContext(src, c);
    });
});

test('interpolation literals', { skip: !hasTemplateLiterals }, function (t) {
    t.plan(3);

    var b = browserify(__dirname + '/quotes/backtick.js');
    b.bundle(function (err, src) {
        var c = {
            done : function (single, double, backtick) {
                t.equal(single, 'success', 'single quotes');
                t.equal(double, 'success', 'double quotes');
                t.equal(backtick, 'success', 'backtick quotes');
                t.end();
            }
        };
        vm.runInNewContext(src, c);
    });
});
