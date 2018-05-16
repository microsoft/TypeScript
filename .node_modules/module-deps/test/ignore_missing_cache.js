var parser = require('../');
var test = require('tap').test;
var fs = require('fs');
var path = require('path');

var files = {
    main: path.join(__dirname, '/ignore_missing/main.js'),
    other: path.join(__dirname, '/ignore_missing/other.js')
};

var sources = Object.keys(files).reduce(function (acc, file) {
    acc[file] = fs.readFileSync(files[file], 'utf8');
    return acc;
}, {});

var cache = {};
cache[files.main] = {
    source: sources.main,
    deps: { './other': files.other }
};
cache[files.other] = {
    source: sources.other,
    deps: { 'missingModule': undefined }
};

test('ignoreMissing with cache', function (t) {
    t.plan(1);
    var p = parser({ cache: cache, ignoreMissing: true });
    p.end({file: files.main, entry: true});
    
    var rows = [];
    p.on('data', function (row) { rows.push(row) });
    p.on('end', function () {
        t.same(rows.sort(cmp), [
            {
                id: files.main,
                file: files.main,
                source: sources.main,
                entry: true,
                deps: { './other': files.other }
            },
            {
                id: files.other,
                file: files.other,
                source: sources.other,
                deps: { 'missingModule': undefined }
            }
        ].sort(cmp));
    });
});

function cmp (a, b) { return a.id < b.id ? -1 : 1 }
