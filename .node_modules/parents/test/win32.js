var test = require('tap').test;
var parents = require('../');

test('win32', function (t) {
    var dir = 'c:\\Program Files\\Maxis\\Sim City 2000\\cities';
    var dirs = parents(dir, { platform : 'win32' });
    t.same(dirs, [
        'c:\\Program Files\\Maxis\\Sim City 2000\\cities',
        'c:\\Program Files\\Maxis\\Sim City 2000',
        'c:\\Program Files\\Maxis',
        'c:\\Program Files',
        'c:',
    ]);
    t.end();
});

test('win32 c:', function (t) {
    var dirs = parents('c:\\', { platform : 'win32' });
    t.same(dirs, [ 'c:' ]);
    t.end();
});

test('win32 network drive', function (t) {
    var dirs = parents(
        '\\storageserver01\\Active Projects\\ProjectA',
        { platform : 'win32' }
    );
    t.same(dirs, [
        '\\storageserver01\\Active Projects\\ProjectA',
        '\\storageserver01\\Active Projects',
        '\\storageserver01'
    ]);
    t.end();
});
