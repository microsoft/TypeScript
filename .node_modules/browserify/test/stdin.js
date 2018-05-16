var test = require('tap').test;
var spawn = require('child_process').spawn;
var concat = require('concat-stream');
var path = require('path');
var vm = require('vm');

test('stdin', function (t) {
    t.plan(2);
    
    var cwd = process.cwd();
    process.chdir(__dirname);
    
    var ps = spawn(process.execPath, [
        path.resolve(__dirname, '../bin/cmd.js'),
        '-'
    ]);
    
    ps.stdout.pipe(concat(function (body) {
        var c = { console: {
            log: function (msg) {
                t.equal(msg, 'hello');
            }
        } };
        vm.runInNewContext(body, c);
    }));
    ps.stderr.pipe(process.stderr);
    
    ps.on('exit', function (code) {
        t.equal(code, 0);
    });
    
    ps.stdin.write("console.log('hello')");
    ps.stdin.end();
    
});
