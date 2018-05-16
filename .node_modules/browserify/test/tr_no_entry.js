var browserify = require('../');
var test = require('tap').test;
var path = require('path')

test('transform with no entry files', function (t) {
    process.chdir(__dirname);
    
    t.plan(2);
    var b = browserify();
    b.transform('tr');
    b.require(path.join(__dirname, 'tr_no_entry/main.js'), {
        expose: 'yoyo'
    });
    b.bundle(function (err, body) {
        t.ifError(err);
        var src = body.toString('utf8') + 'require("yoyo")';
        var con = { log: function (msg) { t.equal(msg, 'ZZZ') } };
        Function('console', src)(con);
    });
});
