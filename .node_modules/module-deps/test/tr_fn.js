var mdeps = require('../');
var test = require('tap').test;
var JSONStream = require('JSONStream');
var packer = require('browser-pack');
var through = require('through2');
var path = require('path');

test('transform', function (t) {
    t.plan(3);
    var p = mdeps({
        transform: function (file) {
            return through(function (buf, enc, next) {
                this.push(String(buf)
                    .replace(/AAA/g, '5')
                    .replace(/BBB/g, '50')
                );
                next();
            });
        },
        transformKey: [ 'browserify', 'transform' ]
    });
    p.end(path.join(__dirname, '/files/tr_sh/main.js'));
    var pack = packer();
    
    p.pipe(JSONStream.stringify()).pipe(pack);
    
    var src = '';
    pack.on('data', function (buf) { src += buf });
    pack.on('end', function () {
        Function('t', src)(t);
    });
});
