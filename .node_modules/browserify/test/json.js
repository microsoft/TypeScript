var browserify = require('../');
var fs = require('fs');
var vm = require('vm');
var semver = require('semver');
var test = require('tap').test;

test('json', function (t) {
    t.plan(2);
    var b = browserify();
    b.add(__dirname + '/json/main.js');
    b.bundle(function (err, src) {
        if (err) t.fail(err);
        var c = {
            ex : function (obj) {
                t.same(obj, { beep : 'boop', x : 555 });
            }
        };
        vm.runInNewContext(src, c);
    });
});

// This works in Node v10 and up thanks to the JSON superset proposal, which
// allows the evil chars in javascript strings.
// https://github.com/tc39/proposal-json-superset
test('verify evil json', { skip: semver.gte(process.version, 'v10.0.0') }, function(t) {
    t.plan(1);
    fs.readFile(__dirname + '/json/evil-chars.json', function(err, data) {
        if (err) t.fail(err);
        t.throws(function() {
            vm.runInNewContext('(' + data.toString() + ')');
        });
    });
});

test('evil json', function (t) {
    t.plan(2);
    var b = browserify();
    b.add(__dirname + '/json/evil.js');
    b.bundle(function (err, src) {
        if (err) t.fail(err);
        var c = {
            ex : function (obj) {
                t.same(obj, { evil : '\u2028\u2029' });
            }
        };
        vm.runInNewContext(src, c);
    });
});
