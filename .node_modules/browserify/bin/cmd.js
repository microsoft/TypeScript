#!/usr/bin/env node
var fs = require('fs');
var JSONStream = require('JSONStream');
var through = require('through2');
var mkdirp = require('mkdirp');
var path = require('path');

var b = require('./args')(process.argv.slice(2));
process.stdout.on('error', process.exit);

if ((b.argv._[0] === 'help' && b.argv._[1]) === 'advanced'
|| (b.argv.h || b.argv.help) === 'advanced') {
    return fs.createReadStream(__dirname + '/advanced.txt')
        .pipe(process.stdout)
        .on('close', function () { process.exit(1) })
    ;
}
if (b.argv._[0] === 'help' || b.argv.h || b.argv.help
|| (process.argv.length <= 2 && process.stdin.isTTY)) {
    return fs.createReadStream(__dirname + '/usage.txt')
        .pipe(process.stdout)
        .on('close', function () { process.exit(1) })
    ;
}
if (b.argv.version) {
    return console.log(require('../package.json').version);
}

b.on('error', errorExit);

if (b.argv.pack) {
    process.stdin.pipe(b.pack()).pipe(process.stdout);
    process.stdin.resume();
    return;
}

if (b.argv.deps) {
    var stringify = JSONStream.stringify();
    stringify.pipe(process.stdout);
    b.pipeline.get('deps').push(through.obj(
        function (row, enc, next) { stringify.write(row); next() },
        function () { stringify.end() }
    ));
    return b.bundle();
}

if (b.argv.list) {
    b.pipeline.get('deps').push(through.obj(
        function (row, enc, next) {
            console.log(row.file || row.id);
            next()
        }
    ));
    return b.bundle();
}

var bundle = b.bundle();
bundle.on('error', errorExit);
bundle.on('end', successExit);

var tmpfile;
var outfile = b.argv.o || b.argv.outfile;
if (outfile) {
    mkdirp.sync(path.dirname(outfile));
    
    // we'll output to a temp file within same filesystem, then atomically overwrite outfile once successful
    tmpfile = outfile + ".tmp-browserify-" + Math.random().toFixed(20).slice(2)
    bundle.pipe(fs.createWriteStream(tmpfile));
}
else {
    bundle.pipe(process.stdout);
}

function errorExit(err) {
    if (tmpfile) fs.unlink(tmpfile, function (err) {
      if (err) /* no-op, we're already exiting unhappily… */;
    });
    if (err.stack) {
        console.error(err.stack);
    }
    else {
        console.error(String(err));
    }
    process.exit(1);
}

function successExit() {
  if (tmpfile && outfile) fs.rename(tmpfile, outfile, function (err) {
    if (err) errorExit(err);
  });
}
