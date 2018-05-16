var parser = require('../');
var test = require('tap').test;
var path = require('path');
var fs = require('fs');

var files = {
    foo: path.join(__dirname, '/files/foo.js'),
    bar: path.join(__dirname, '/files/bar.js')
};

test('uses persistent cache', function (t) {
    t.plan(1);
    var p = parser({
        persistentCache: function (file, id, pkg, fallback, cb) {
            if (file === files.bar) {
                return fallback(null, cb);
            }
            cb(null, {
                source: 'file at ' + file + '@' + id,
                package: pkg,
                deps: { './bar': files.bar }
            });
        }
    });
    p.end({ id: 'foo', file: files.foo, entry: false });

    var rows = [];
    p.on('data', function (row) { rows.push(row) });
    p.on('end', function () {
        t.same(rows.sort(cmp), [
            {
                id: files.bar,
                file: files.bar,
                source: fs.readFileSync(files.bar, 'utf8'),
                deps: {}
            },
            {
                id: 'foo',
                file: files.foo,
                source: 'file at ' + files.foo + '@' + files.foo,
                deps: { './bar': files.bar }
            }
        ].sort(cmp));
    });
});

test('passes persistent cache error through', function (t) {
    t.plan(1);
    var p = parser({
        persistentCache: function (file, id, pkg, fallback, cb) {
            cb(new Error('foo'));
        }
    });
    p.end({ id: 'foo', file: files.foo, entry: false });
    p.on('error', function (err) { t.equals(err.message, 'foo') });
});

test('allow passing of the raw source as string', function (t) {
    t.plan(1);
    var p = parser({
        persistentCache: function (file, id, pkg, fallback, cb) {
            fallback(fs.readFileSync(files.bar, 'utf8'), cb);
        }
    });
    p.end({ id: 'foo', file: files.foo, entry: false });

    var rows = [];
    p.on('data', function (row) { rows.push(row) });
    p.on('end', function () {
        t.same(rows.sort(cmp), [
            {
                id: 'foo',
                file: files.foo,
                source: fs.readFileSync(files.bar, 'utf8'),
                deps: {}
            }
        ].sort(cmp));
    });
});

test('send file event with persistent cache', function (t) {
    t.plan(2);
    var p = parser({
        persistentCache: function (file, id, pkg, fallback, cb) {
            cb(null, {
                source: 'file at ' + file + '@' + id,
                package: pkg,
                deps: {}
            });
        }
    });
    p.end({ id: 'foo', file: files.foo, entry: false });
    p.on('file', function (file, id) {
        t.same(file, path.resolve(files.foo));
        t.same(id, path.resolve(files.foo));
    });
});

test('errors of transforms occur in the correct order with a persistent cache', function (t) {
    t.plan(3);
    var p = parser({
        transform: [
            path.join(__dirname, 'cache_persistent', 'error_transform')
        ],
        persistentCache: function (file, id, pkg, fallback, cb) {
            fallback(fs.readFileSync(files.foo, 'utf8'), cb);
        }
    });
    p.end({ id: 'foo', file: files.foo, entry: false });
    var order = 0;
    p.on('file', function (file, id) {
        t.same(order, 0);
        order += 1;
    });
    p.on('error', function (err) {
        t.same(order, 1);
        t.same(err.message, 'rawr while parsing file: ' + path.resolve(files.foo));
    });
});


function cmp (a, b) { return a.id < b.id ? -1 : 1 }
