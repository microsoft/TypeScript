var parser = require('../');
var test = require('tap').test;
var through = require('through2');
var path = require('path');

// test that (non global) transforms are applied to an exposed module, where in the
// exposed name is identical to the file path.
test('row is exposed with a name equal to the path, and transformed', function (t) {
        t.plan(2);
        var exposed_path = path.join(__dirname, '/files/main.js');
        var found_exposed_path = false;
        var opts = {
                expose: {},
                transform: function(file) {
                        if (file === exposed_path) {
                                found_exposed_path = true;
                        }
                        return through();
                }
        };

        var p = parser(opts);
        p.end({ file: exposed_path, expose: exposed_path });
        p.on('error', t.fail.bind(t));

        p.pipe(through.obj());

        p.on('end', function () {
                t.equal(opts.expose[exposed_path], exposed_path);
                t.ok(found_exposed_path);
        });
});
