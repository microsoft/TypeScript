var test = require('tap').test;
var spawn = require('child_process').spawn;
var path = require('path');
var concat = require('concat-stream');
var vm = require('vm');

test('transform arguments', function (t) {
    t.plan(2);
    
    var ps = spawn(process.execPath, [
        path.resolve(__dirname, '../bin/cmd.js'),
        __dirname + '/tr_args/main.js',
        '-t', '[', __dirname + '/tr_args/tr.js', '-x', '1', ']'
    ]);
    
    ps.stderr.pipe(process.stderr);
    ps.stdout.pipe(concat(function (body) {
        vm.runInNewContext(body.toString('utf8'), { t: t });
    }));
    
    ps.on('exit', function (code) {
        t.equal(code, 0);
    });
});
