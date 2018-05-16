var test = require('tap').test;
var spawn = require('child_process').spawn;
var browserify = require('../');
var path = require('path');
var concat = require('concat-stream');
var vm = require('vm');
var fs = require('fs');
var through = require('through2');
var temp = require('temp');
temp.track();
var tmpdir = temp.mkdirSync({prefix: 'browserify-test'});

test('bare', function (t) {
    t.plan(4);
    
    var cwd = process.cwd();
    process.chdir(__dirname);
    
    var ps = spawn(process.execPath, [
        path.resolve(__dirname, '../bin/cmd.js'),
        '-', '--bare'
    ]);
    ps.stdout.pipe(concat(function (body) {
        vm.runInNewContext(body, {
            Buffer: function (s) { return s.toLowerCase() },
            console: {
                log: function (msg) { t.equal(msg, 'abc') }
            }
        });
        vm.runInNewContext(body, {
            Buffer: Buffer,
            console: {
                log: function (msg) {
                    t.ok(Buffer.isBuffer(msg));
                    t.equal(msg.toString('utf8'), 'ABC')
                }
            }
        });
    }));
    ps.stdin.end('console.log(Buffer("ABC"))');
    
    ps.on('exit', function (code) {
        t.equal(code, 0);
    });
});

test('bare api', function (t) {
    t.plan(3);
    
    var input = through();
    var b = browserify(input, { bare: true });
    b.bundle().pipe(concat(function (body) {
        vm.runInNewContext(body, {
            Buffer: function (s) { return s.toLowerCase() },
            console: {
                log: function (msg) { t.equal(msg, 'abc') }
            }
        });
        vm.runInNewContext(body, {
            Buffer: Buffer,
            console: {
                log: function (msg) {
                    t.ok(Buffer.isBuffer(msg));
                    t.equal(msg.toString('utf8'), 'ABC')
                }
            }
        });
    }));
    input.end('console.log(Buffer("ABC"))');
});

test('bare inserts __filename,__dirname but not process,global,Buffer', function (t) {
    t.plan(2);
    
    var file = path.resolve(__dirname, 'bare/main.js');
    var ps = spawn(process.execPath, [
        path.resolve(__dirname, '../bin/cmd.js'),
        file,
        '--bare'
    ]);
    
    ps.stdout.pipe(concat(function (body) {
        vm.runInNewContext(body, {
            require: require,
            __dirname: process.cwd(),
            console: {
                log: function (msg) {
                    t.same(msg, [
                        path.join(__dirname, 'bare'),
                        path.join(__dirname, 'bare/main.js'),
                        'undefined',
                        'undefined',
                        'undefined'
                    ]);
                }
            }
        });
    }));
    ps.stdin.end();
    
    ps.on('exit', function (code) {
        t.equal(code, 0);
    });
});

test('bare inserts dynamic __filename,__dirname', function (t) {
    t.plan(2);
    
    var file = path.join(tmpdir, 'dirname-filename.js');

    fs.writeFileSync(
        file,
        fs.readFileSync(path.resolve(__dirname, 'bare/dirname-filename.js'))
    );

    var ps = spawn(process.execPath, [
        path.resolve(__dirname, '../bin/cmd.js'),
        file,
        '--bare'
    ]);
    
    ps.stdout.pipe(concat(function (body) {
        vm.runInNewContext(body, {
            require: require,
            __dirname: process.cwd(),
            console: {
                log: function (msg) {
                    t.same(msg, [
                        path.dirname(file),
                        file
                    ]);
                }
            }
        });
    }));
    ps.stdin.end();
    
    ps.on('exit', function (code) {
        t.equal(code, 0);
    });
});

test('bare inserts dynamic __filename,__dirname with basedir', function (t) {
    t.plan(2);
    
    var file = 'dirname-filename.js';
    var ps = spawn(process.execPath, [
        path.resolve(__dirname, '../bin/cmd.js'),
        file,
        '--bare',
        '--basedir=' + path.join(__dirname, 'bare')
    ]);
    
    ps.stdout.pipe(concat(function (body) {
        vm.runInNewContext(body, {
            require: require,
            __dirname: process.cwd(),
            console: {
                log: function (msg) {
                    t.same(msg, [
                        __dirname,
                        path.join(__dirname, file)
                    ]);
                }
            }
        });
    }));
    ps.stdin.end();
    
    ps.on('exit', function (code) {
        t.equal(code, 0);
    });
});
