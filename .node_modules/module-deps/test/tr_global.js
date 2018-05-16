var mdeps = require('../');
var test = require('tap').test;
var JSONStream = require('JSONStream');
var packer = require('browser-pack');
var concat = require('concat-stream');
var path = require('path');

test('global transforms', function (t) {
    t.plan(1);
    
    var p = mdeps({
        transform: [ 'tr-c', 'tr-d' ],
        globalTransform: [
            path.join(__dirname, '/files/tr_global/node_modules/tr-e'),
            path.join(__dirname, '/files/tr_global/node_modules/tr-f')
        ],
        transformKey: [ 'browserify', 'transform' ]
    });
    p.end(path.join(__dirname, '/files/tr_global/main.js'));
    var pack = packer();
    
    p.pipe(JSONStream.stringify()).pipe(pack).pipe(concat(function (src) {
        Function(['console'], src)({
            log: function (msg) {
                t.equal(msg, 111111);
            }
        });
    }));
});
