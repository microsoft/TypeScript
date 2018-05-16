var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;
var path = require('path');

test('file event', function (t) {
    t.plan(8);
    
    var b = browserify(__dirname + '/entry/main.js');
    var files = {
        'main.js': path.join(__dirname, 'entry/main.js'),
        'one.js': './one',
        'two.js': './two'
    };
    
    b.on('file', function (file, id) {
        var key = path.basename(file);
        t.equal(file, path.join(__dirname, 'entry', key));
        t.equal(id, files[key]);
        delete files[key];
    });
    
    b.bundle(function (err, src) {
        var c = {
            done : function (one, two) {
                t.equal(one, 1);
                t.equal(two, 2);
                t.end();
            }
        };
        vm.runInNewContext(src, c);
    });
});
