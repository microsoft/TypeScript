var browserify = require('../');
var test = require('tap').test;
var path = require('path');

test('noParse array', function (t) {
    process.chdir(__dirname);
    
    t.plan(2);
    
    var actual = [];
    var expected = [
        'noparse/a.js',
        'noparse/b.js',
        'noparse/dir1/1.js',
        'noparse/node_modules/robot/main.js'
    ].map(function (x) {return path.resolve(x);}).sort();
    
    var b = browserify({
        entries: [ __dirname + '/noparse/a.js' ],
        noParse: [
            path.join(__dirname, 'noparse/dir1/1.js'),
            path.join(__dirname, 'noparse/node_modules/robot/main.js')
        ]
    });
    b.on('dep', function(dep) { actual.push(dep.file); });
    b.bundle(function (err, src) {
        actual.sort();
        t.ifError(err);
        t.deepEqual(actual, expected);
    });
});
