var test = require('tap').test;
var browserify = require('../');
var path = require('path');
var mainfile = path.join(__dirname, 'ignore_browser_field/main.js');
var vm = require('vm');

test('ignore browser field', function (t) {
    t.plan(3);
    var b = browserify(mainfile, { browserField: false });
    var expected = [ 'A:NODE', 'B:X.JS' ];
    
    b.bundle(function (err, src) {
        t.ifError(err);
        var c = { console: { log: log } };
        vm.runInNewContext(src, c);
        
        function log (msg) {
            t.equal(msg, expected.shift());
        }
    });
});
