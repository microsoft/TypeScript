var test = require('tap').test;
var browserify = require('../');
var vm = require('vm');

test('bundle external', function (t) {
    t.plan(3);
    
    var expected = [
        { name: 'beep', value: 111 },
        { name: 't-rex', value: 5 }
    ];
    
    var b = browserify({ bundleExternal: false });
    b.add(__dirname + '/bundle_external/main.js');
    b.bundle(function (err, src) {
        var c = {
            t: t,
            require: function (name) {
                var r = expected.shift();
                t.equal(name, r.name);
                return r.value;
            }
        };
        vm.runInNewContext(src, c);
    });
});
