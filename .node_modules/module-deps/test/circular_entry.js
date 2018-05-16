var parser = require('../');
var test = require('tap').test;
var JSONStream = require('JSONStream');
var path = require('path');

test('circular entry', function (t) {
    t.plan(1);
    var p = parser();
    p.end(path.join(__dirname, '/circular_entry/app'));
    p.on('error', t.fail.bind(t));
    
    p.pipe(JSONStream.stringify()).pipe(process.stdout);
});
