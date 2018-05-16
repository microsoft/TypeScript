var test = require('tap').test;
var spawn = require('child_process').spawn;
var path = require('path');
var vm = require('vm');

test('compiling coffee with -c', function (t) {
    t.plan(4);
    
    var cwd = process.cwd();
    process.chdir(__dirname);
    
    var ps = spawn(process.execPath, [
        path.resolve(__dirname, '../bin/cmd.js'),
        '-c', '"' + process.execPath + '" "' + __dirname + '/../node_modules/coffee-script/bin/coffee" -sc',
        'coffee_bin/main.coffee'
    ]);
    var src = '';
    var err = '';
    ps.stdout.on('data', function (buf) { src += buf });
    ps.stderr.on('data', function (buf) { err += buf });
    
    ps.on('exit', function (code) {
        t.equal(code, 0);
        t.equal(err, '');
        
        var msgs = [ 'hello world!', 'from x!' ];
        var c = {
            console: {
                log: function (msg) {
                    t.equal(msg, msgs.shift());
                }
            }
        };
        vm.runInNewContext(src, c);
    });
});
