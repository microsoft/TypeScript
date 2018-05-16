var mdeps = require('../');
var test = require('tap').test;
var JSONStream = require('JSONStream');
var packer = require('browser-pack');
var path = require('path');
var concat = require('concat-stream');

test('transform write', function (t) {
    t.plan(1);
    var p = mdeps();
    
    p.write({
        transform: 'insert-www',
        options: {}
    });
    p.write({
        file: path.join(__dirname, 'tr_write/main.js'),
        id: path.join(__dirname, 'tr_write/main.js'),
        entry: true
    });
    p.end();
    
    var pack = packer();
    p.pipe(JSONStream.stringify()).pipe(pack);
    
    pack.pipe(concat(function (buf) {
        var src = buf.toString('utf8');
        Function('console', src)({ log: function (msg) {
            t.equal(msg, 'WORLD WIDE WOW');
        } });
    }));
});
