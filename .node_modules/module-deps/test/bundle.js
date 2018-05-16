var parser = require('../');
var test = require('tap').test;
var JSONStream = require('JSONStream');
var packer = require('browser-pack');
var path = require('path');

test('bundle', function (t) {
    t.plan(1);
    var p = parser();
    p.end(path.join(__dirname, '/files/main.js'));
    p.on('error', t.fail.bind(t));
    var pack = packer();
    
    p.pipe(JSONStream.stringify()).pipe(pack);
    
    var src = '';
    pack.on('data', function (buf) { src += buf });
    pack.on('end', function () {
        Function('console', src)({
            log: function (s) { t.equal(s, 'main: 1055') }
        });
    });
});
