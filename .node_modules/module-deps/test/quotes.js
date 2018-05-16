var parser = require('../');
var test = require('tap').test;
var fs = require('fs');
var path = require('path');

var files = {
    main: path.join(__dirname, '/files/quotes/main.js'),
    foo: path.join(__dirname, '/files/quotes/foo.js'),
    bar: path.join(__dirname, '/files/quotes/bar.js'),
    baz: path.join(__dirname, '/files/quotes/baz.js')
};

var sources = Object.keys(files).reduce(function (acc, file) {
    acc[file] = fs.readFileSync(files[file], 'utf8');
    return acc;
}, {});

test('different quote styles', function (t) {
    t.plan(1);
    var p = parser();
    p.end(files.main);
    var main = null

    p.on('data', function (row) {
        if (row.id === files.main) {
            main = row
        }
    });
    p.on('end', function () {
        t.same(main, {
            id: files.main,
            file: files.main,
            source: sources.main,
            entry: true,
            deps: {
                './foo': files.foo,
                './bar': files.bar,
                './baz': files.baz
            }
        });
    });
});
