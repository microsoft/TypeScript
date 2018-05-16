var pipeline = require('../');
var concat = require('concat-stream');
var test = require('tape');

test('empty with no data', function (t) {
    t.plan(1);
    
    var stream = pipeline([]);
    stream.end();
    stream.pipe(concat(function (body) {
        t.deepEqual(body.toString(), '');
    }));
});
