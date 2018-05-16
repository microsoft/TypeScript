var parser = require('../');
var test = require('tap').test;
var fs = require('fs');
var path = require('path');

var files = {
    main: path.join(__dirname, '/files/main.js'),
    foo: path.join(__dirname, '/files/foo.js'),
    bar: path.join(__dirname, '/files/bar.js'),
    extra: path.join(__dirname, '/files/extra.js')
};
var sources = {
    foo: fs.readFileSync(files.foo, 'utf8'),
    bar: fs.readFileSync(files.bar, 'utf8'),
    extra: fs.readFileSync(files.extra, 'utf8'),
    main: "console.log(require('./foo')(5)); require('./extra.js')"
};

test('source', function (t) {
    t.plan(1);
    var p = parser();
    p.end({
        file: files.main,
        source: sources.main,
        entry: true
    });
    
    var rows = [];
    p.on('data', function (row) { rows.push(row) });
    p.on('end', function () {
        t.same(rows.sort(cmp), [
            {
                id: files.main,
                file: files.main,
                source: sources.main,
                entry: true,
                deps: { './foo': files.foo, './extra.js': files.extra }
            },
            {
                id: files.foo,
                file: files.foo,
                source: sources.foo,
                deps: { './bar': files.bar }
            },
            {
                id: files.bar,
                file: files.bar,
                source: sources.bar,
                deps: {}
            },
            {
                id: files.extra,
                file: files.extra,
                source: sources.extra,
                deps: {}
            },
        ].sort(cmp));
    });
});

function cmp (a, b) { return a.id < b.id ? -1 : 1 }
