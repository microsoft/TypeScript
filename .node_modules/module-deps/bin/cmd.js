#!/usr/bin/env node
var mdeps = require('../');
var subarg = require('subarg');
var fs = require('fs');
var path = require('path');

var argv = subarg(process.argv.slice(2), {
    alias: { h: 'help', t: 'transform', g: 'globalTransform' }
});
if (argv.help) return usage(0);

var JSONStream = require('JSONStream');

var files = argv._.map(function (file) {
    if (file === '-') return process.stdin;
    return path.resolve(file);
});
var md = mdeps(argv);
md.pipe(JSONStream.stringify()).pipe(process.stdout);

files.forEach(function (file) { md.write(file) });
md.end();

function usage (code) {
    var r = fs.createReadStream(__dirname + '/usage.txt');
    r.pipe(process.stdout);
    if (code) r.on('end', function () { process.exit(code) });
}
