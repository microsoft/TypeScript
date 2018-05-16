var pipeline = require('../');
var concat = require('concat-stream');
var test = require('tape');

test('empty passthrough stream', function (t) {
    t.plan(1);
    
    var stream = pipeline([]);
    stream.pipe(concat(function (body) {
        t.deepEqual(body.toString(), 'abc');
    }));
    
    stream.write('a');
    stream.write('b');
    stream.write('c');
    stream.end();
});
