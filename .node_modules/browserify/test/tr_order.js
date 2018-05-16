var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;
var through = require('through2');

test('function transform', function (t) {
  debugger;
    t.plan(8);
    
    var b = browserify(__dirname + '/tr/main.js');
    b.transform({ global: true }, function (file) {
        return through(function (buf, enc, next) {
            this.push(String(buf).replace(/ZZZ/g, '1'));
            next();
        });
    });
    b.transform(__dirname + '/tr_order/replace_aaa');
    b.transform(__dirname + '/tr_order/replace_bbb.js');
    b.bundle(function (err, src) {
        t.ifError(err);
        vm.runInNewContext(src, { t: t });
    });
});
