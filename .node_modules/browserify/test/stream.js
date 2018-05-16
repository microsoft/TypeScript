var browserify = require('../');
var vm = require('vm');
var test = require('tap').test;
var fs = require('fs');

test('stream', function (t) {
    t.plan(2);
    
    var stream = fs.createReadStream(__dirname + '/stream/main.js');
    var b = browserify(stream, { basedir: __dirname + '/stream' });
    
    b.bundle(function (err, src) {
        vm.runInNewContext(src, { t: t });
    });
});
