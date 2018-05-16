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
  console.log(require('util').inspect(obj, false, depth || 5, true));
}

test('generated mappings', function (t) {

  t.test('one file with source content', function (t) {
    var gen = generator()
      .addGeneratedMappings('foo.js', foo)
      .addSourceContent('foo.js', foo)

    t.deepEqual(
        gen.toJSON()
      , { "version": 3,
          "file": "",
          "sources": [
            "foo.js"
          ],
          "names": [],
          "mappings": "AAAA;AACA;AACA;AACA;AACA",
          "sourceRoot": "",
          "sourcesContent": [
            "function foo() {\n  var hello = 'hello';\n  var world = 'world';\n  console.log('%s %s', hello, world);\n}"
          ],
        }
      , 'includes source content'
    )

    t.equal(
        decode(gen.base64Encode())
      , '{"version":3,"sources":["foo.js"],"names":[],"mappings":"AAAA;AACA;AACA;AACA;AACA","file":"","sourceRoot":"","sourcesContent":["function foo() {\\n  var hello = \'hello\';\\n  var world = \'world\';\\n  console.log(\'%s %s\', hello, world);\\n}"]}'
      , 'encodes generated mappings including source content'
    )
    t.equal(
        gen.inlineMappingUrl()
      , '//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmb28oKSB7XG4gIHZhciBoZWxsbyA9ICdoZWxsbyc7XG4gIHZhciB3b3JsZCA9ICd3b3JsZCc7XG4gIGNvbnNvbGUubG9nKCclcyAlcycsIGhlbGxvLCB3b3JsZCk7XG59Il19'
      , 'returns correct inline mapping url including source content'
    )
    t.end()
  })

  t.test('two files with source content', function (t) {
    var gen = generator()
      .addGeneratedMappings('foo.js', foo)
      .addSourceContent('foo.js', foo)
      .addGeneratedMappings('bar.js', bar)
      .addSourceContent('bar.js', bar)

    t.deepEqual(
        gen.toJSON()
      ,  { "version": 3,
          "file": "",
          "sources": [
            "foo.js",
            "bar.js"
          ],
          "names": [],
          "mappings": "ACAA,ADAA;ACCA,ADAA;ACCA,ADAA;AACA;AACA",
          "sourceRoot": "",
          "sourcesContent": [
            "function foo() {\n  var hello = 'hello';\n  var world = 'world';\n  console.log('%s %s', hello, world);\n}",
            "function bar() {\n  console.log('yes?');\n}"
          ],
        }
      , 'includes source content for both files'
    )

    t.deepEqual(
        decode(gen.base64Encode())
      , '{"version":3,"sources":["foo.js","bar.js"],"names":[],"mappings":"ACAA,ADAA;ACCA,ADAA;ACCA,ADAA;AACA;AACA","file":"","sourceRoot":"","sourcesContent":["function foo() {\\n  var hello = \'hello\';\\n  var world = \'world\';\\n  console.log(\'%s %s\', hello, world);\\n}","function bar() {\\n  console.log(\'yes?\');\\n}"]}'
      , 'encodes generated mappings including source content'
    )
    t.equal(
        gen.inlineMappingUrl()
      , '//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyIsImJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQSxBREFBO0FDQ0EsQURBQTtBQ0NBLEFEQUE7QUFDQTtBQUNBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBmb28oKSB7XG4gIHZhciBoZWxsbyA9ICdoZWxsbyc7XG4gIHZhciB3b3JsZCA9ICd3b3JsZCc7XG4gIGNvbnNvbGUubG9nKCclcyAlcycsIGhlbGxvLCB3b3JsZCk7XG59IiwiZnVuY3Rpb24gYmFyKCkge1xuICBjb25zb2xlLmxvZygneWVzPycpO1xufSJdfQ=='
      , 'returns correct inline mapping url including source content'
    )
    t.end()
  })

  t.test('two files, only one with source content', function (t) {
    var gen = generator()
      .addGeneratedMappings('foo.js', foo)
      .addGeneratedMappings('bar.js', bar)
      .addSourceContent('bar.js', bar)

    t.deepEqual(
        gen.toJSON()
      ,  { "version": 3,
          "file": "",
          "sources": [
            "foo.js",
            "bar.js"
          ],
          "names": [],
          "mappings": "ACAA,ADAA;ACCA,ADAA;ACCA,ADAA;AACA;AACA",
          "sourcesContent": [ null, "function bar() {\n  console.log('yes?');\n}" ],
          "sourceRoot": ""
        }
      , 'includes source content for the file with source content and [null] for the other file'
    )

    t.deepEqual(
        decode(gen.base64Encode())
      , '{"version":3,"sources":["foo.js","bar.js"],"names":[],"mappings":"ACAA,ADAA;ACCA,ADAA;ACCA,ADAA;AACA;AACA","file":"","sourceRoot":"","sourcesContent":[null,"function bar() {\\n  console.log(\'yes?\');\\n}"]}'
      , 'encodes generated mappings including source content'
    )
    t.equal(
        gen.inlineMappingUrl()
      , '//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvby5qcyIsImJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUNBQSxBREFBO0FDQ0EsQURBQTtBQ0NBLEFEQUE7QUFDQTtBQUNBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6W251bGwsImZ1bmN0aW9uIGJhcigpIHtcbiAgY29uc29sZS5sb2coJ3llcz8nKTtcbn0iXX0='
      , 'returns correct inline mapping url including source content'
    )
    t.end()
  })

  t.test('one file with empty source', function (t) {
    var gen = generator()
      .addGeneratedMappings('empty.js', '')
      .addSourceContent('empty.js', '')
    t.deepEqual(gen.toJSON()["sourcesContent"], [""])
    t.end()
  });
})
