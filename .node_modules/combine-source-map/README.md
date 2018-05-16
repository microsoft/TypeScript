# combine-source-map [![build status](https://secure.travis-ci.org/thlorenz/combine-source-map.png)](http://travis-ci.org/thlorenz/combine-source-map)

Add source maps of multiple files, offset them and then combine them into one source map.

```js
var convert = require('convert-source-map');
var combine = require('combine-source-map');

var fooComment = '//# sourceMappingURL=data:application/json;base64,eyJ2Z [..] pzJylcbiJdfQ==';
var barComment = '//# sourceMappingURL=data:application/json;base64,eyJ2Z [..] VjaycpXG4iXX0=';

var fooFile = {
    source: '(function() {\n\n  console.log(require(\'./bar.js\'));\n\n}).call(this);\n' + '\n' + fooComment
  , sourceFile: 'foo.js'
};
var barFile = {
    source: '(function() {\n\n  console.log(alert(\'alerts suck\'));\n\n}).call(this);\n' + '\n' + barComment
  , sourceFile: 'bar.js'
};

var offset = { line: 2 };
var base64 = combine
  .create('bundle.js')
  .addFile(fooFile, offset)
  .addFile(barFile, { line: offset.line + 8 })
  .base64();

var sm = convert.fromBase64(base64).toObject();
console.log(sm);
```

```
{ version: 3,
  file: 'bundle.js',
  sources: [ 'foo.coffee', 'bar.coffee' ],
  names: [],
  mappings: ';;;AAAA;CAAA;CAAA,CAAA,CAAA,IAAO,GAAK;CAAZ;;;;;ACAA;CAAA;CAAA,CAAA,CAAA,IAAO,GAAK;CAAZ',
  sourcesContent:
   [ 'console.log(require \'./bar.js\')\n',
     'console.log(alert \'alerts suck\')\n' ] }
```

## Installation

    npm install combine-source-map

## API

### create()

```
/**
 * @name create
 * @function
 * @param file {String} optional name of the generated file
 * @param sourceRoot { String} optional sourceRoot of the map to be generated
 * @return {Object} Combiner instance to which source maps can be added and later combined
 */
```

### Combiner.prototype.addFile(opts, offset)

```
/**
 * Adds map to underlying source map.
 * If source contains a source map comment that has the source of the original file inlined it will offset these
 * mappings and include them.
 * If no source map comment is found or it has no source inlined, mappings for the file will be generated and included
 * 
 * @name addMap
 * @function
 * @param opts {Object} { sourceFile: {String}, source: {String} }
 * @param offset {Object} { line: {Number}, column: {Number} }
 */
```

### Combiner.prototype.base64()

```
/**
* @name base64
* @function
* @return {String} base64 encoded combined source map
*/
```

### Combiner.prototype.comment()

```
/**
 * @name comment
 * @function
 * @return {String} base64 encoded sourceMappingUrl comment of the combined source map
 */
```

### removeComments(src)

```
/**
 * @name removeComments
 * @function
 * @param src 
 * @return {String} src with all sourceMappingUrl comments removed
 */
```

## Example 

Read and run the [more elaborate example](https://github.com/thlorenz/combine-source-map/blob/master/example/two-files.js) 
in order to get a better idea how things work.
