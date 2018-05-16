var browserify = require('../');
var vm = require('vm');
var through = require('through2');
var test = require('tap').test;

var fs = require('fs');
var sources = {
    1: fs.readFileSync(__dirname + '/entry/main.js', 'utf8'),
    2: fs.readFileSync(__dirname + '/entry/one.js', 'utf8'),
    3: fs.readFileSync(__dirname + '/entry/two.js', 'utf8')
};

var deps = {
    1: { './two': 3, './one': 2 },
    2: {},
    3: {}
};

test('custom packer', function (t) {
    t.plan(7);
    
    var b = browserify(__dirname + '/entry/main.js');
    b.pipeline.get('pack').splice(0,1, through.obj(function (row, enc, next) {
        t.equal(sources[row.id], row.source);
        t.deepEqual(deps[row.id], row.deps);
        this.push(row.id + '\n');
        next();
    }));
    b.pipeline.get('wrap').splice(0);
    b.bundle(function (err, src) {
        t.equal(src.toString('utf8'), '1\n2\n3\n');
    });
});
