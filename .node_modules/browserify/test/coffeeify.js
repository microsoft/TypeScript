var test = require('tap').test;
var browserify = require('../');
var vm = require('vm');

test('coffeeify with an implicit global', function (t) {
    t.plan(1);
    
    var b = browserify(__dirname + '/coffeeify/main.coffee');
    b.transform('coffeeify');
    b.bundle(function (err, src) {
        if (err) t.fail(err);
        vm.runInNewContext(src, {
            console: { log: log },
            setTimeout: setTimeout,
            clearTimeout: clearTimeout
        });
        function log (msg) { t.equal(msg, 'eyo') }
    });
});
