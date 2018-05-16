var test = require('tap').test;
var pack = require('../');
var convert = require('convert-source-map');
var parse = require('parse-base64vlq-mappings');

var foo = { 
    version: 3,
    file: 'foo.js',
    sourceRoot: '',
    sources: [ 'foo.coffee' ],
    names: [],
    mappings: ';AAAA;CAAA;CAAA,CAAA,CAAA,IAAO,GAAK;CAAZ',
    sourcesContent: [ 'console.log(require \'./bar.js\')\n' ] };

test('pack one file with source file field and existing sourcemap', function (t) {
    t.plan(7);
    
    var mapComment = convert.fromObject(foo).toComment();
    var fooMappings = parse(foo.mappings);

    var p = pack();
    var src = '';
    p.on('data', function (buf) { src += buf });
    p.on('end', function () {

        var sm = convert.fromSource(src).toObject();
        var mappings = parse(sm.mappings);

        var remainingMaps = src.match(convert.commentRegex);

        // remove map for _prelude.js
        mappings.shift();

        var fstMap = mappings[0];
        var fstFooMap = fooMappings[0];
        var lstMap = mappings.pop();
        var lstFooMap = fooMappings.pop();

        t.deepEqual(fstMap.original, fstFooMap.original, 'first original mappings are same');
        t.deepEqual(lstMap.original, lstFooMap.original, 'last original mappings are same');

        t.equal(fstMap.generated.column, fstFooMap.generated.column, 'first generated columns are same');
        t.equal(lstMap.generated.column, lstFooMap.generated.column, 'last generated columns are same');

        t.equal(fstMap.generated.line, fstFooMap.generated.line + 1, 'first generated line is offset by 1');
        t.equal(lstMap.generated.line, lstFooMap.generated.line + 1, 'last generated line is offset by 1');

        t.equal(remainingMaps.length, 1, 'removes orinal source maps');
    });
    
    p.end(JSON.stringify([
        {
            id: 'xyz',
            source: '(function() {\n\n  console.log(require(\'./bar.js\'));\n\n}).call(this);\n' + '\n' + mapComment,
            sourceFile: 'foo.js'
        }
    ]));
});

