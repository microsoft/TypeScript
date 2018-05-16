var browserify = require('../');
var fs = require('fs');
var vm = require('vm');
var test = require('tap').test;

var src = fs.readFileSync(__dirname + '/async/src.js','utf8');
var canAsync = true;
try { Function(src) } catch (err) { canAsync = false }

if (!canAsync) console.error('# async/await unsupported in this environment')
else test('async/await', function (t) {
    t.plan(2);
    var b = browserify(__dirname + '/async/src.js');
    b.bundle(function (err, src) {
        t.error(err)
        var c = {
            console: { log: log },
            setTimeout: setTimeout,
            clearTimeout: clearTimeout
        }
        vm.runInNewContext(src, c);
        function log (msg) { t.equal(msg, 60) }
    });
});
