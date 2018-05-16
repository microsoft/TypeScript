var test = require('tap').test;
var spawn = require('child_process').spawn;
var path = require('path');
var concat = require('concat-stream');
var vm = require('vm');

test('glob', function (t) {
    var expected = [ 'a', '!x', 'z', 'b', '!y' ];
    t.plan(expected.length + 1);
    
    var cwd = process.cwd();
    process.chdir(__dirname);
    
    var ps = spawn(process.execPath, [
        path.resolve(__dirname, '../bin/cmd.js'),
        'a.js', 'b.js',
        '-u', 'vendor/*.js'
    ], { cwd: __dirname + '/glob' });
    ps.stderr.pipe(process.stderr);
    ps.stdout.pipe(concat(function (body) {
        var c = { console: { log: log } };
        vm.runInNewContext(body.toString('utf8'), c);
        function log (msg) { t.equal(msg, expected.shift()) }
    }));
    
    ps.on('exit', function (code) {
        t.equal(code, 0);
    });
});
