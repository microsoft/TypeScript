#!/usr/bin/env node

var insert = require('../');
var through = require('through2');
var concat = require('concat-stream');
var JSONStream = require('JSONStream');

var basedir = process.argv[2] || process.cwd();

process.stdin
    .pipe(JSONStream.parse([ true ]))
    .pipe(through.obj(write))
    .pipe(JSONStream.stringify())
    .pipe(process.stdout)
;

function write (row, enc, next) {
    var self = this;
    var s = insert(row.id, { basedir: basedir });
    s.pipe(concat(function (src) {
        row.source = src.toString('utf8');
        self.push(row);
        next();
    }));
    s.end(row.source);
}
