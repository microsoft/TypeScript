var Seq = require('seq');
var browserify = require('../');
var test = require('tap').test;
var shasum = require('shasum');

test('syntax cache - valid', function (t) {
    t.plan(2);
    
    var expectedCache = {}
    var cacheKey;
    
    var b = browserify(__dirname + '/syntax_cache/valid.js');    
    b.once('dep', function(row) {
        cacheKey = shasum(row.source);
        expectedCache[cacheKey] = true;
    });
    
    Seq()
        .seq(function() { b.bundle(this); })
        .seq(function() {
            t.deepEqual(b._syntaxCache, expectedCache);
            b._syntaxCache[cacheKey] = expectedCache[cacheKey] = 'beep';
            b.bundle(function(err, src) {
                // if the cache worked, the "cacheKey"
                // should not be reset to "true"
                t.deepEqual(b._syntaxCache, expectedCache);
            });
        });
});

test('syntax cache - skip invalid', function (t) {
    t.plan(5);
    
    var b = browserify(__dirname + '/syntax_cache/invalid.js');
    
    Seq()
        .seq(function() { b.bundle(this); })
        .catch(function(lastErr) {
            t.deepEqual(b._syntaxCache, {});
            t.similar(String(lastErr), /ParseError/);
            b.bundle(function(err, src) {
                t.deepEqual(b._syntaxCache, {});
                t.similar(String(err), /ParseError/);
                t.notEqual(lastErr, err, 'errors should be unique');
            });
        });
});
