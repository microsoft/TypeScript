var test = require('tap').test;
var detective = require('../');
var fs = require('fs');
var src = fs.readFileSync(__dirname + '/files/rest-spread.js');

test('rest-spread', function (t) {
    t.doesNotThrow(detective.bind(detective, src), 'Files with rest or spread do not throw')
    t.end();
});
