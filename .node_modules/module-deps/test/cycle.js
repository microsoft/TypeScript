var mdeps = require('../');
var test = require('tap').test;
var JSONStream = require('JSONStream');
var packer = require('browser-pack');
var concat = require('concat-stream');
var path = require('path');

test('cycle', function (t) {
    t.plan(1);
    var p = mdeps();
    p.end(path.join(__dirname, '/cycle/main.js'));
    var pack = packer();
    
    p.pipe(JSONStream.stringify()).pipe(pack).pipe(concat(function (src) {
        Function('console', src.toString('utf8'))({
            log: function (msg) { t.equal(msg, 333) }
        });
    }));
});
