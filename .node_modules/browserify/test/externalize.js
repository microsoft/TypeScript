var test = require('tap').test;
var spawn = require('child_process').spawn;
var concat = require('concat-stream');
var path = require('path');
var fs = require('fs');
var vm = require('vm');

var temp = require('temp');
temp.track();
var tmpdir = temp.mkdirSync({prefix: 'browserify-test'});
var pubdir = path.join(tmpdir, 'public');

fs.mkdirSync(pubdir);
fs.writeFileSync(
    path.join(tmpdir, 'robot.js'),
    fs.readFileSync(path.join(__dirname, 'externalize/robot.js'))
);
fs.writeFileSync(
    path.join(tmpdir, 'beep.js'),
    fs.readFileSync(path.join(__dirname, 'externalize/beep.js'))
);
fs.writeFileSync(
    path.join(tmpdir, 'boop.js'),
    fs.readFileSync(path.join(__dirname, 'externalize/boop.js'))
);

test('externalize bin', function (t) {
    t.plan(5);

    var commands = [
        [ '-r', './robot.js', '-o', path.join(pubdir, 'common.js') ],
        [ '-x', './robot.js', 'beep.js', '-o', path.join(pubdir, 'beep.js') ],
        [ '-x', './robot.js', 'boop.js', '-o', path.join(pubdir, 'boop/bop.js') ]
    ];
    (function next () {
        if (commands.length === 0) {
            var common = fs.readFileSync(path.join(pubdir, 'common.js'));
            var beep = fs.readFileSync(path.join(pubdir, 'beep.js'));
            var boop = fs.readFileSync(path.join(pubdir, 'boop/bop.js'));

            vm.runInNewContext(common + beep, {
                console: { log: function (msg) { t.equal(msg, 'BEEP!') } }
            });
            vm.runInNewContext(common + boop, {
                console: { log: function (msg) { t.equal(msg, 'BOOP!') } }
            });
        }
        else {
            var args = commands.shift();
            args.unshift(path.join(__dirname, '../bin/cmd.js'));
            var ps = spawn(process.execPath, args, { cwd: tmpdir });
            ps.stderr.pipe(process.stderr);
            ps.on('exit', function (code) {
                t.equal(code, 0, 'exit code');
                next()
            });
        }
    })();
});
