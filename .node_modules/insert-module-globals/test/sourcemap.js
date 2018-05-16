var test = require('tape');
var convert = require('convert-source-map');
var insert = require('../');
var mdeps = require('module-deps');
var vm = require('vm');
var path = require('path');

test('sourcemap', function (t) {
    t.plan(6);
    
    var file = __dirname + '/sourcemap/main.js';
    var deps = mdeps()
    
    deps.on('data', function(row) {
        var src = row.source;
        
        var sm = convert.fromSource(src).toObject();
        t.deepEqual(sm.sources, [ 'test/sourcemap/main_es6.js' ]);
        t.deepEqual(sm.sourcesContent, [ 'console.log(`${__dirname}`, `${__filename}`);\n' ]);
        t.deepEqual(sm.mappings, ';AAAA,OAAO,CAAC,GAAG,MAAI,SAAS,OAAO,UAAU,CAAG,CAAC');
        
        t.equal(src.match(convert.commentRegex).length, 1);
        
        var c = {
            console: {
                log: function(dirname, filename) {
                    t.equal(dirname, '/');
                    t.equal(filename, '/main.js');
                }
            },
        };
        vm.runInNewContext(src, c);
    });
    
    deps.write({ transform: inserter, global: true });
    deps.end(file);
});

function inserter (file) {
    return insert(file, { debug: true, basedir: __dirname + '/sourcemap' });
}
