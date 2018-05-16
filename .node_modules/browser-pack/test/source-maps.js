var test = require('tap').test;
var pack = require('../');
var path = require('path');

function decode(base64) {
    return new Buffer(base64, 'base64').toString();
} 

function unmountPrelude(sources) {
  return sources.map(function (x) {
    var basename = path.basename(x);
    return basename === '_prelude.js' ? basename : x;
  });
}

function grabSourceMap(lastLine) {
    var base64 = lastLine.split(',').pop();
    var sm = JSON.parse(decode(base64));
    sm.sources = unmountPrelude(sm.sources);
    return sm;
}

function grabLastLine(src) {
    return src.split('\n').slice(-2)[0];
}

test('pack one file with source file field and one without', function (t) {
    t.plan(7);
    
    var p = pack();
    var src = '';
    p.on('data', function (buf) { src += buf });
    p.on('end', function () {
        var r = Function(['T'], 'return ' + src)(t);
        t.equal(r('xyz')(5), 555);
        t.equal(r('xyz')(5), 555);

        var lastLine = grabLastLine(src);
        var sm = grabSourceMap(lastLine);

        t.ok(/^\/\/# sourceMappingURL/.test(lastLine), 'contains source mapping url as last line');
        t.deepEqual(sm.sources, [ '_prelude.js', 'foo.js' ], 'includes mappings for sourceFile and prelude only');
        t.equal(sm.mappings, 'AAAA;;;ACAA;AACA;AACA;AACA', 'adds offset mapping for each line' );
    });
    
    p.end(JSON.stringify([
        {
            id: 'abc',
            source: 'T.equal(require("./xyz")(3), 333)',
            entry: true,
            deps: { './xyz': 'xyz' }
        },
        {
            id: 'xyz',
            source: 'T.ok(true);\nmodule.exports=function(n){\n return n*111 \n}',
            sourceFile: 'foo.js'
        }
    ]));
});

test('pack two files with source file field', function (t) {
    t.plan(7);
    
    var p = pack();
    var src = '';
    p.on('data', function (buf) { src += buf });
    p.on('end', function () {
        var r = Function(['T'], 'return ' + src)(t);
        t.equal(r('xyz')(5), 555);
        t.equal(r('xyz')(5), 555);

        var lastLine = grabLastLine(src);
        var sm = grabSourceMap(lastLine);

        t.ok(/^\/\/# sourceMappingURL/.test(lastLine), 'contains source mapping url as last line');
        t.deepEqual(sm.sources, [ '_prelude.js', 'wunder/bar.js', 'foo.js' ], 'includes mappings for both files and prelude');
        t.equal(sm.mappings, 'AAAA;ACAA;;ACAA;AACA;AACA;AACA', 'adds offset mapping for each line' );
    });
    
    p.end(JSON.stringify([
        {
            id: 'abc',
            source: 'T.equal(require("./xyz")(3), 333)',
            entry: true,
            deps: { './xyz': 'xyz' },
            sourceFile: 'wunder/bar.js'
        },
        {
            id: 'xyz',
            source: 'T.ok(true);\nmodule.exports=function(n){\n return n*111 \n}',
            sourceFile: 'foo.js'
        }
    ]));
});

test('pack two files without source file field', function (t) {
    t.plan(5);
    
    var p = pack();
    var src = '';
    p.on('data', function (buf) { src += buf });
    p.on('end', function () {
        var r = Function(['T'], 'return ' + src)(t);
        t.equal(r('xyz')(5), 555);
        t.equal(r('xyz')(5), 555);

        var lastLine = grabLastLine(src); 
        t.notOk(/^\/\/# sourceMappingURL/.test(lastLine), 'contains no source mapping url');
    });
    
    p.end(JSON.stringify([
        {
            id: 'abc',
            source: 'T.equal(require("./xyz")(3), 333)',
            entry: true,
            deps: { './xyz': 'xyz' }
        },
        {
            id: 'xyz',
            source: 'T.ok(true);\nmodule.exports=function(n){\n return n*111 \n}'
        }
    ]));
});

test('pack two files with source file field, one with nomap flag', function (t) {
    t.plan(7);
    
    var p = pack();
    var src = '';
    p.on('data', function (buf) { src += buf });
    p.on('end', function () {
        var r = Function(['T'], 'return ' + src)(t);
        t.equal(r('xyz')(5), 555);
        t.equal(r('xyz')(5), 555);

        var lastLine = grabLastLine(src);
        var sm = grabSourceMap(lastLine);

        t.ok(/^\/\/# sourceMappingURL/.test(lastLine), 'contains source mapping url as last line');
        t.deepEqual(sm.sources, [ '_prelude.js', 'wunder/bar.js' ], 'includes mappings for only the file without the "nomap" flag and prelude');
        t.equal(sm.mappings, 'AAAA;ACAA', 'adds offset mapping for each line of mapped file' );
        t.end()
    });
    
    p.end(JSON.stringify([
        {
            id: 'abc',
            source: 'T.equal(require("./xyz")(3), 333)',
            entry: true,
            deps: { './xyz': 'xyz' },
            sourceFile: 'wunder/bar.js'
        },
        {
            id: 'xyz',
            source: 'T.ok(true);\nmodule.exports=function(n){\n return n*111 \n}',
            sourceFile: 'foo.js',
            nomap: true
        }
    ]));
});

test('custom sourceMapPrefix for //@', function (t) {
    t.plan(7);
    
    var p = pack({ sourceMapPrefix: '//@' });
    var src = '';
    p.on('data', function (buf) { src += buf });
    p.on('end', function () {
        var r = Function(['T'], 'return ' + src)(t);
        t.equal(r('xyz')(5), 555);
        t.equal(r('xyz')(5), 555);

        var lastLine = grabLastLine(src);
        var sm = grabSourceMap(lastLine);

        t.ok(/^\/\/@ sourceMappingURL/.test(lastLine), 'contains source mapping url as last line');
        t.deepEqual(sm.sources, [ '_prelude.js', 'foo.js' ], 'includes mappings for sourceFile and prelude only');
        t.equal(sm.mappings, 'AAAA;;;ACAA;AACA;AACA;AACA', 'adds offset mapping for each line' );
    });
    
    p.end(JSON.stringify([
        {
            id: 'abc',
            source: 'T.equal(require("./xyz")(3), 333)',
            entry: true,
            deps: { './xyz': 'xyz' }
        },
        {
            id: 'xyz',
            source: 'T.ok(true);\nmodule.exports=function(n){\n return n*111 \n}',
            sourceFile: 'foo.js'
        }
    ]));
});

test('custom sourceRoot', function (t) {
  t.plan(1);

  var p = pack({ sourceRoot: '/custom-root' });
  var src = '';
  p.on('data', function (buf) { src += buf });
  p.on('end', function () {
      var lastLine = grabLastLine(src);
      var sm = grabSourceMap(lastLine);
      t.equal(sm.sourceRoot, '/custom-root', 'sets a custom source root' );
  });

  p.end(JSON.stringify([
      {
          id: 'abc',
          source: 'T.equal(require("./xyz")(3), 333)',
          entry: true,
          deps: { './xyz': 'xyz' }
      },
      {
          id: 'xyz',
          source: 'T.ok(true);\nmodule.exports=function(n){\n return n*111 \n}',
          sourceFile: 'foo.js'
      }
  ]));
});
