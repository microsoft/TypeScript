var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;
var through = require('through2');

test('function transform', function (t) {
    t.plan(7);
    
    var b = browserify(__dirname + '/tr/main.js');
    b.transform({ global: true }, function (file) {
        return through(function (buf, enc, next) {
            this.push(String(buf).replace(/ZZZ/g, '1'));
            next();
        });
    });
    b.transform(function (file) {
        return through(function (buf, enc, next) {
            this.push(String(buf)
                .replace(/AAA/g, '5')
                .replace(/BBB/g, '50')
            );
            next();
        })
    });
    b.bundle(function (err, src) {
        vm.runInNewContext(src, { t: t });
    });
});
