var test = require('tap').test;
var pack = require('../');
var vm = require('vm');

test('empty', function (t) {
    t.plan(1);
    
    var p = pack();
    var src = '';
    p.on('data', function (buf) { src += buf });
    p.on('end', function () {
        t.doesNotThrow(function() {
            vm.runInNewContext(src, {});
        });
    });

    p.end();
});

test('empty with standalone', function (t) {
    t.plan(1);
    
    var p = pack({standalone: 'ABC'});
    var src = '';
    p.on('data', function (buf) { src += buf });
    p.on('end', function () {
        t.doesNotThrow(function() {
            vm.runInNewContext(src, {});
        });
    });

    p.end();
});
