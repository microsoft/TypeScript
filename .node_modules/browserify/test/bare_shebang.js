var test = require('tap').test;
var spawn = require('child_process').spawn;
var path = require('path');
var concat = require('concat-stream');
var vm = require('vm');

test('bare shebang', function (t) {
    t.plan(4);
    
    var ps = spawn(process.execPath, [
        path.resolve(__dirname, '../bin/cmd.js'),
        '-', '--bare'
    ]);
    ps.stderr.pipe(process.stderr);
    ps.stdout.pipe(concat(function (body) {
        vm.runInNewContext(body, {
            Buffer: function (s) { return s.toLowerCase() },
            console: {
                log: function (msg) { t.equal(msg, 'woo') }
            }
        });
        vm.runInNewContext(body, {
            Buffer: Buffer,
            console: {
                log: function (msg) {
                    t.ok(Buffer.isBuffer(msg));
                    t.equal(msg.toString('utf8'), 'WOO')
                }
            }
        });
    }));
    ps.stdin.end('#!/usr/bin/env node\nconsole.log(Buffer("WOO"))');
    
    ps.on('exit', function (code) {
        t.equal(code, 0);
    });
});
