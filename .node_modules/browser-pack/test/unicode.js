var test = require('tap').test;
var pack = require('../');

test('unicode', function (t) {
    t.plan(5);
    
    var p = pack({ raw: true });
    var src = '';
    p.on('data', function (buf) { src += buf });
    p.on('end', function () {
        var r = Function(['Ṫ'], 'return ' + src)(t);
        t.equal(r('xyz')(5), 555);
        t.equal(r('xyz')(5), 555);
        t.throws(function() {
            r('zzz');
        }, /Cannot find module 'zzz'/);
    });
    
    p.write({
        id: 'abc',
        source: 'Ṫ.equal(require("./xyz")(3), 333)',
        entry: true,
        deps: { './xyz': 'xyz' }
    });
    
    p.write({
        id: 'xyz',
        source: 'Ṫ.ok(true); module.exports=function(ñ){return ñ*111}'
    });
    
    p.end();
});
