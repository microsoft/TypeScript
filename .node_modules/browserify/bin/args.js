var browserify = require('../');
var path = require('path');
var spawn = require('child_process').spawn;
var parseShell = require('shell-quote').parse;
var insertGlobals = require('insert-module-globals');
var duplexer = require('duplexer2');
var subarg = require('subarg');
var glob = require('glob');
var Readable = require('readable-stream').Readable;
var xtend = require('xtend');

module.exports = function (args, opts) {
    var argv = subarg(args, {
        'boolean': [
            'deps', 'pack', 'ig', 'dg', 'im', 'd', 'list', 'builtins',
            'commondir', 'bare', 'full-paths', 'bundle-external', 'bf',
            'node', 'preserve-symlinks'
        ],
        string: [ 's', 'r', 'u', 'x', 't', 'i', 'o', 'e', 'c', 'it' ],
        alias: {
            ig: [ 'insert-globals', 'fast' ],
            dg: [ 'detect-globals', 'detectGlobals', 'dg' ],
            bf: [ 'browser-field', 'browserField' ],
            im: 'ignore-missing',
            it: 'ignore-transform',
            igv: 'insert-global-vars',
            d: 'debug',
            s: 'standalone',
            noParse: [ 'noparse' ],
            'full-paths': [ 'fullpaths', 'fullPaths' ],
            r: 'require',
            u: 'exclude',
            x: 'external',
            t: 'transform',
            i: 'ignore',
            o: 'outfile',
            e: 'entry',
            c: 'command',
            bare: 'bear'
        },
        'default': {
            ig: false,
            im: false,
            dg: true,
            d: false,
            builtins: true,
            commondir: true,
            'bundle-external': true,
            bf: true,
            dedupe: true,
            node: false
        }
    });
    
    var entries = argv._.concat(argv.entry)
    .filter(Boolean).map(function (entry) {
        if (entry === '-') {
            var s = process.stdin;
            if (typeof s.read === 'function') return s;
            // only needed for 0.8, remove at some point later:
            var rs = Readable().wrap(s);
            s.resume();
            return rs;
        }
        return entry;
    });

    if (argv.igv) {
        var insertGlobalVars = {};
        var wantedGlobalVars = argv.igv.split(',');
        Object.keys(insertGlobals.vars).forEach(function (x) {
            if (wantedGlobalVars.indexOf(x) === -1) {
                insertGlobalVars[x] = undefined;
            }
        });
    }
    
    var ignoreTransform = argv['ignore-transform'] || argv.it;
    var b = browserify(xtend({
        node: argv.node,
        bare: argv.bare,
        noParse: Array.isArray(argv.noParse) ? argv.noParse : [argv.noParse],
        extensions: [].concat(argv.extension).filter(Boolean).map(function (extension) {
            if (extension.charAt(0) != '.') { 
                return '.' + extension;
            } else {
                return extension
            }
        }),
        ignoreTransform: [].concat(ignoreTransform).filter(Boolean),
        entries: entries,
        fullPaths: argv['full-paths'],
        builtins: argv.builtins === false ? false : undefined,
        commondir: argv.commondir === false ? false : undefined,
        bundleExternal: argv['bundle-external'],
        basedir: argv.basedir,
        browserField: argv.browserField,
        transformKey: argv['transform-key'] ? ['browserify', argv['transform-key']] : undefined,
        dedupe: argv['dedupe'],
        preserveSymlinks: argv['preserve-symlinks'],

        detectGlobals: argv.detectGlobals,
        insertGlobals: argv['insert-globals'] || argv.ig,
        insertGlobalVars: insertGlobalVars,
        ignoreMissing: argv['ignore-missing'] || argv.im,
        debug: argv['debug'] || argv.d,
        standalone: argv['standalone'] || argv.s
    }, opts));
    function error (msg) {
        var e = new Error(msg);
        process.nextTick(function () { b.emit('error', e) });
    }
    b.argv = argv;
    [].concat(argv.p).concat(argv.plugin).filter(Boolean)
        .forEach(function (p) {
            var pf = p, pOpts = {};
            if (typeof p === 'object') {
                pf = p._.shift(), pOpts = p;
            }
            b.plugin(pf, pOpts);
        })
    ;
    
    [].concat(argv.ignore).filter(Boolean)
        .forEach(function (i) {
            b._pending ++;
            glob(i, function (err, files) {
                if (err) return b.emit('error', err);
                if (files.length === 0) {
                  b.ignore(i);
                }
                else {
                  files.forEach(function (file) { b.ignore(file) });
                }
                if (--b._pending === 0) b.emit('_ready');
            });
        })
    ;
    
    [].concat(argv.exclude).filter(Boolean)
        .forEach(function (u) {
            b.exclude(u);
            
            b._pending ++;
            glob(u, function (err, files) {
                if (err) return b.emit('error', err);
                files.forEach(function (file) { b.exclude(file) });
                if (--b._pending === 0) b.emit('_ready');
            });
        })
    ;

    [].concat(argv.require).filter(Boolean)
        .forEach(function (r) {
            var xs = splitOnColon(r);
            b.require(xs[0], { expose: xs.length === 1 ? xs[0] : xs[1] })
        })
    ;
    
    // resolve any external files and add them to the bundle as externals
    [].concat(argv.external).filter(Boolean)
        .forEach(function (x) {
            var xs = splitOnColon(x);
            if (xs.length === 2) {
                add(xs[0], { expose: xs[1] });
            }
            else if (/\*/.test(x)) {
                b.external(x);
                glob(x, function (err, files) {
                    files.forEach(function (file) {
                        add(file, {});
                    });
                });
            }
            else add(x, {});
            
            function add (x, opts) {
                if (/^[\/.]/.test(x)) b.external(path.resolve(x), opts)
                else b.external(x, opts)
            }
        })
    ;
    
    [].concat(argv.transform)
        .filter(Boolean)
        .forEach(function (t) { addTransform(t) })
    ;
    
    [].concat(argv.g).concat(argv['global-transform'])
        .filter(Boolean)
        .forEach(function (t) {
            addTransform(t, { global: true });
        })
    ;
    
    function addTransform (t, opts) {
        if (typeof t === 'string' || typeof t === 'function') {
            b.transform(opts, t);
        }
        else if (t && typeof t === 'object') {
            if (!t._[0] || typeof t._[0] !== 'string') {
                return error(
                    'expected first parameter to be a transform string'
                );
            }
            if (opts) Object.keys(opts).forEach(function (key) {
                t[key] = opts[key];
            });
            b.transform(t, t._.shift());
        }
        else error('unexpected transform of type ' + typeof t);
    }
    
    [].concat(argv.command).filter(Boolean)
        .forEach(function (c) {
            var cmd = parseShell(c);
            b.transform(function (file) {
                var env = Object.keys(process.env).reduce(function (acc, key) {
                    acc[key] = process.env[key];
                    return acc;
                }, {});
                env.FILENAME = file;
                var ps = spawn(cmd[0], cmd.slice(1), { env: env });
                var error = '';
                ps.stderr.on('data', function (buf) { error += buf });
                
                ps.on('exit', function (code) {
                    if (code === 0) return;
                    console.error([
                        'error running source transform command: ' + c,
                        error.split('\n').join('\n  '),
                        ''
                    ].join('\n'));
                    process.exit(1);
                });
                return duplexer(ps.stdin, ps.stdout);
            });
        })
    ;
    
    if (argv.standalone === '') {
        error('--standalone requires an export name argument');
        return b;
    }
    
    return b;
};

function splitOnColon (f) {
    var pos = f.lastIndexOf(':');
    if (pos == -1) {
        return [f]; // No colon
    } else {
        if ((/[a-zA-Z]:[\\/]/.test(f)) && (pos == 1)){
            return [f]; // Windows path and colon is part of drive name
        } else {
            return [f.substr(0, pos), f.substr(pos + 1)];
        }
    }
}
