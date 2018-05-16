var test = require('tap').test;
var spawn = require('child_process').spawn;
var path = require('path');
var vm = require('vm');

test('bin', function (t) {
    t.plan(3);
    
    var cwd = process.cwd();
    process.chdir(__dirname);
    
    var ps = spawn(process.execPath, [
        path.resolve(__dirname, '../bin/cmd.js'),
        'entry/main.js'
    ]);
    var src = '';
    var err = '';
    ps.stdout.on('data', function (buf) { src += buf });
    ps.stderr.on('data', function (buf) { err += buf });
    
    ps.on('exit', function (code) {
        t.equal(code, 0);
        t.equal(err, '');
        
        var allDone = false;
        var c = { done : function () { allDone = true } };
        
        vm.runInNewContext(src, c);
        t.ok(allDone);
    });
});
