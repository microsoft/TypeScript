var test = require('tap').test;
var browserify = require('../');
var vm = require('vm');

test('entry expose', function (t) {
    t.plan(3)
    
    var b = browserify();
    b.add(__dirname + '/entry_expose/main.js');
    b.require(__dirname + '/entry_expose/main.js', { expose: 'x' });
    b.bundle(function (err, src) {
        t.ifError(err);
        var c = { console: { log: log } };
        function log (msg) { t.equal(msg, 'wow') }
        vm.runInNewContext(src, c);
        t.equal(c.require('x'), 555);
    })
});
