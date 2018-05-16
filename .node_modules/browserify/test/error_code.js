var test = require('tap').test;
var spawn = require('child_process').spawn;
var path = require('path');
var semver = require('semver');

// TODO this should be fixable I guess
var knownFailure = process.platform === 'win32' && semver.satisfies(process.version, 'v0.10.x');

test('error code', { skip: knownFailure }, function (t) {
    t.plan(2);
    
    var cwd = process.cwd();
    process.chdir(__dirname);
    
    var ps = spawn(process.execPath, [
        path.resolve(__dirname, '../bin/cmd.js'),
        path.resolve(__dirname, 'error_code/src.js')
    ]);
    var err = '';
    ps.stderr.on('data', function (buf) { err += buf });
    ps.stderr.on('end', function () {
        t.ok(/^(Syntax|Parse)Error:/m.test(err));
    });
    
    ps.on('exit', function (code) {
        t.notEqual(code, 0);
    });
});
