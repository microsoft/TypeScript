var splicer = require('../');
var through = require('through2');
var JSONStream = require('JSONStream');
var split = require('split');

var headerData = {};
var headers = through.obj(function (buf, enc, next) {
    var line = buf.toString('utf8');
    if (line === '') {
        this.push(headerData);
        pipeline.splice(1, 1, JSONStream.parse([ 'rows', true ]));
    }
    else {
        var m = /^(\S+):(.+)/.exec(line);
        var key = m && m[1].trim();
        var value = m && m[2].trim();
        if (m) headerData[key] = value;
    }
    next();
});
var pipeline = splicer([ split(), headers, JSONStream.stringify() ]);
process.stdin.pipe(pipeline).pipe(process.stdout);
