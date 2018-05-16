var browserify = require('../');
var test = require('tap').test;
var vm = require('vm');
var hasObjectSpread = require('has-object-spread')();

test('yield', { skip: !hasObjectSpread }, function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/spread/main.js');
    
    b.bundle(function (err, src) {
        t.error(err);
        t.notEqual(src.indexOf('...b'), -1, 'passed through spread syntax')
    });
});
