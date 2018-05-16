'use strict';
/*jshint asi: true*/

var test = require('tap').test
var generator = require('..');

var foo = '' + function foo () {
  var hello = 'hello';
  var world = 'world';
  console.log('%s %s', hello, world);
}

var bar = '' + function bar () {
  console.log('yes?');
}

function decode(base64) {
  return new Buffer(base64, 'base64').toString();
} 

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

test('generated mappings', function (t) {

  t.test('one file no offset', function (t) {
    var gen = generator()
      .addGeneratedMappings('foo.js', foo)

    t.deepEqual(
      gen._mappings()
    , [ { generatedLine: 1,
          generatedColumn: 0,
          originalLine: 1,
          originalColumn: 0,
          source: 'foo.js',
          name: null },
        { generatedLine: 2,
          generatedColumn: 0,
          originalLine: 2,
          originalColumn: 0,
          source: 'foo.js',
          name: null },
        { generatedLine: 3,
          generatedColumn: 0,
          originalLine: 3,
          originalColumn: 0,
          source: 'foo.js',
          name: null },
        { generatedLine: 4,
          generatedColumn: 0,
          originalLine: 4,
          originalColumn: 0,
          source: 'foo.js',
          name: null },
        { generatedLine: 5,
          generatedColumn: 0,
          originalLine: 5,
          originalColumn: 0,
          source: 'foo.js',
          name: null } ]      
      , 'generates correct mappings'
    )

    t.deepEqual(
        JSON.parse(decode(gen.base64Encode()))
      , {"version":3,"file":"","sources":["foo.js"],"names":[],"mappings":"AAAA;AACA;AACA;AACA;AACA","sourceRoot":""}
      , 'encodes generated mappings'
    )
    t.equal(
        gen.inlineMappingUrl()
      , '//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIifQ=='
      , 'returns correct inline mapping url'
    )
    t.end()
  })

  t.test('two files no offset', function (t) {
    var gen = generator()
      .addGeneratedMappings('foo.js', foo)
      .addGeneratedMappings('bar.js', bar)

    t.deepEqual(
        gen._mappings()
      , [ { generatedLine: 1,
            generatedColumn: 0,
            originalLine: 1,
            originalColumn: 0,
            source: 'foo.js',
            name: null },
          { generatedLine: 2,
            generatedColumn: 0,
            originalLine: 2,
            originalColumn: 0,
            source: 'foo.js',
            name: null },
          { generatedLine: 3,
            generatedColumn: 0,
            originalLine: 3,
            originalColumn: 0,
            source: 'foo.js',
            name: null },
          { generatedLine: 4,
            generatedColumn: 0,
            originalLine: 4,
            originalColumn: 0,
            source: 'foo.js',
            name: null },
          { generatedLine: 5,
            generatedColumn: 0,
            originalLine: 5,
            originalColumn: 0,
            source: 'foo.js',
            name: null },
          { generatedLine: 1,
            generatedColumn: 0,
            originalLine: 1,
            originalColumn: 0,
            source: 'bar.js',
            name: null },
          { generatedLine: 2,
            generatedColumn: 0,
            originalLine: 2,
            originalColumn: 0,
            source: 'bar.js',
            name: null },
          { generatedLine: 3,
            generatedColumn: 0,
            originalLine: 3,
            originalColumn: 0,
            source: 'bar.js',
            name: null } ]      
        , 'generates correct mappings'
    )
    t.deepEqual(
        JSON.parse(decode(gen.base64Encode()))
      , {"version":3,"file":"","sources":["foo.js","bar.js"],"names":[],"mappings":"ACAA,ADAA;ACCA,ADAA;ACCA,ADAA;AACA;AACA","sourceRoot": ""}
      , 'encodes generated mappings'
    )
    t.equal(
        gen.inlineMappingUrl()
      , '//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyIsImJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQSxBREFBO0FDQ0EsQURBQTtBQ0NBLEFEQUE7QUFDQTtBQUNBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIifQ=='
      , 'returns correct inline mapping url'
    )
    t.end()
  })

  t.test('one line source', function (t) {
    var gen = generator().addGeneratedMappings('one-liner.js',  'console.log("line one");')
    t.deepEqual(
        gen._mappings()
      , [ { generatedLine: 1,
            generatedColumn: 0,
            originalLine: 1,
            originalColumn: 0,
            source: 'one-liner.js',
            name: null } ]      
    , 'generates correct mappings'
    )
    t.end()
  })

  t.test('with offset', function (t) {
    var gen = generator()
      .addGeneratedMappings('foo.js', foo, { line: 20 })
      .addGeneratedMappings('bar.js', bar, { line: 23, column: 22 })

    t.deepEqual(
        gen._mappings()
      , [ { generatedLine: 21,
            generatedColumn: 0,
            originalLine: 1,
            originalColumn: 0,
            source: 'foo.js',
            name: null },
          { generatedLine: 22,
            generatedColumn: 0,
            originalLine: 2,
            originalColumn: 0,
            source: 'foo.js',
            name: null },
          { generatedLine: 23,
            generatedColumn: 0,
            originalLine: 3,
            originalColumn: 0,
            source: 'foo.js',
            name: null },
          { generatedLine: 24,
            generatedColumn: 0,
            originalLine: 4,
            originalColumn: 0,
            source: 'foo.js',
            name: null },
          { generatedLine: 25,
            generatedColumn: 0,
            originalLine: 5,
            originalColumn: 0,
            source: 'foo.js',
            name: null },
          { generatedLine: 24,
            generatedColumn: 22,
            originalLine: 1,
            originalColumn: 0,
            source: 'bar.js',
            name: null },
          { generatedLine: 25,
            generatedColumn: 22,
            originalLine: 2,
            originalColumn: 0,
            source: 'bar.js',
            name: null },
          { generatedLine: 26,
            generatedColumn: 22,
            originalLine: 3,
            originalColumn: 0,
            source: 'bar.js',
            name: null } ]        
      , 'generates correct mappings'
    )

    t.deepEqual(
        JSON.parse(decode(gen.base64Encode()))
      , {"version":3,"file":"","sources":["foo.js","bar.js"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;AAAA;AACA;AACA;AACA,sBCHA;ADIA,sBCHA;sBACA", "sourceRoot": ""}
      , 'encodes generated mappings with offset'
    )
    t.end()
  })
})

test('given mappings, with one having no original', function (t) {
  t.test('no offset', function (t) {
    var gen = generator()
      .addMappings('foo.js', [{ original: { line: 2, column: 3 } , generated: { line: 5, column: 10 } }])

      // This addresses an edgecase in which a transpiler generates mappings but doesn't include the original position.
      // If we set source to sourceFile (as usual) in that case, the mappings are considered invalid by the source-map module's
      // SourceMapGenerator. Keeping source undefined fixes this problem.
      // Raised issue: https://github.com/thlorenz/inline-source-map/issues/2
      // Validate function: https://github.com/mozilla/source-map/blob/a3372ea78e662582087dd25ebda999c06424e047/lib/source-map/source-map-generator.js#L232
      .addMappings('bar.js', [
            { original: { line: 6, column: 0 } , generated: { line: 7, column: 20 } }
          , { generated: { line: 8, column: 30 } }
      ])

    t.deepEqual(
        gen._mappings()
      , [ { generatedLine: 5,
            generatedColumn: 10,
            originalLine: 2,
            originalColumn: 3,
            source: 'foo.js',
            name: null },
          { generatedLine: 7,
            generatedColumn: 20,
            originalLine: 6,
            originalColumn: 0,
            source: 'bar.js',
            name: null },
          { generatedLine: 8,
            generatedColumn: 30,
            originalLine: false,
            originalColumn: false,
            source: undefined,
            name: null } ]
      , 'adds correct mappings'
    )
    t.deepEqual(
        JSON.parse(decode(gen.base64Encode()))
      , {"version":3,"file":"","sources":["foo.js","bar.js"],"names":[],"mappings":";;;;UACG;;oBCIH;8B", sourceRoot: ""}
      , 'encodes generated mappings'
    )
    t.equal(
        gen.inlineMappingUrl()
      , '//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyIsImJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O1VBQ0c7O29CQ0lIOzhCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIifQ=='
      , 'returns correct inline mapping url'
    )
    t.end()
  })

  t.test('with offset', function (t) {
    var gen = generator()
      .addMappings('foo.js', [{ original: { line: 2, column: 3 } , generated: { line: 5, column: 10 } }], { line: 5 })
      .addMappings('bar.js', [{ original: { line: 6, column: 0 } , generated: { line: 7, column: 20 } }, { generated: { line: 8, column: 30 } }], { line: 9, column: 3 })

    t.deepEqual(
        gen._mappings()
      , [ { generatedLine: 10,
            generatedColumn: 10,
            originalLine: 2,
            originalColumn: 3,
            source: 'foo.js',
            name: null },
          { generatedLine: 16,
            generatedColumn: 23,
            originalLine: 6,
            originalColumn: 0,
            source: 'bar.js',
            name: null },
          { generatedLine: 17,
            generatedColumn: 33,
            originalLine: false,
            originalColumn: false,
            source: undefined,
            name: null } ]     
      , 'adds correct mappings'
    )
    t.deepEqual(
        JSON.parse(decode(gen.base64Encode()))
      , {"version":3,"file":"","sources":["foo.js","bar.js"],"names":[],"mappings":";;;;;;;;;UACG;;;;;;uBCIH;iC", sourceRoot: ""}
      , 'encodes mappings with offset'
    )
    t.end()
  })
});

test('inline mapping url with charset opt', function(t){
  t.test('set inline mapping url charset to gbk', function(t){
    var gen = generator({charset: 'gbk'})
                .addGeneratedMappings('foo.js', foo);
    t.equal(
      gen.inlineMappingUrl(),
      '//# sourceMappingURL=data:application/json;charset=gbk;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIifQ==',
      'charset set to gbk'
    );

    t.end();
  });

  t.test('default charset should be utf-8', function(t){
    var gen = generator()
              .addGeneratedMappings('foo.js', foo);

    t.equal(
      gen.inlineMappingUrl(),
      '//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIifQ==',
      'charset default to utf-8'
    );

    t.end();
  });
});
