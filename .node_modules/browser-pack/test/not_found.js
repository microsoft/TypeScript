var test = require('tap').test;
var pack = require('../');
var concat = require('concat-stream');

test('not found', function (t) {
    t.plan(6);
    
    var p = pack({ raw: true, hasExports: true });
    var src = '';
    p.pipe(concat(function (src) {
        var r = Function(['T'], 'return ' + src)(t);
        t.equal(r('xyz')(5), 555);
        t.equal(r('xyz')(5), 555);
        t.throws(function() {
            r('zzz');
        }, /Cannot find module 'zzz'/);
        try { r('zzz') }
        catch (err) { t.equal(err.code, 'MODULE_NOT_FOUND') }
    }));
    
    p.write({
        id: 'abc',
        source: 'T.equal(require("./xyz")(3), 333)',
        entry: true,
        deps: { './xyz': 'xyz' }
    });
    
    p.write({
        id: 'xyz',
        source: 'T.ok(true); module.exports=function(n){return n*111}'
    });
    
    p.end();
});
