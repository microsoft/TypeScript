var splicer = require('../');
var through = require('through2');
var deps = require('module-deps');
var pack = require('browser-pack');

var pipeline = splicer.obj([
    'deps', [ deps(__dirname + '/browser/main.js') ],
    'pack', [ pack({ raw: true }) ],
    process.stdout
]);

pipeline.get('deps').push(through.obj(function (row, enc, next) {
    row.source = row.source.toUpperCase();
    this.push(row);
    next();
}));
