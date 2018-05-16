var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;
var through = require('through2');
var path = require('path');

test('transform exactly once', function (t) {
    t.plan(3);
    
    var b = browserify(__dirname + '/tr_once/main.js', {
        transform: function (file) {
        t.equal(file, path.join(__dirname, 'tr_once/main.js') );
            return through();
        }
    });
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { console: { log: log } });
        function log (msg) { t.equal(msg, 'wow') }
    });
});
