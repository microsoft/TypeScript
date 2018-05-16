# inline-source-map [![build status](https://secure.travis-ci.org/thlorenz/inline-source-map.png)](http://travis-ci.org/thlorenz/inline-source-map)

Adds source mappings and base64 encodes them, so they can be inlined in your generated file.

```js
var generator = require('inline-source-map');

// default charset 'utf-8' is configurable
var gen = generator({ charset: 'utf-8' }) 
  .addMappings('foo.js', [{ original: { line: 2, column: 3 } , generated: { line: 5, column: 10 } }], { line: 5 })
  .addGeneratedMappings('bar.js', 'var a = 2;\nconsole.log(a)', { line: 23, column: 22 });

console.log('base64 mapping:', gen.base64Encode());
console.log('inline mapping url:', gen.inlineMappingUrl());
```

```
base64 mapping: eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlcyI6WyJmb28uanMiLCJiYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1VBQ0c7Ozs7Ozs7Ozs7Ozs7O3NCQ0RIO3NCQUNBIn0=
inline mapping url: //@ sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlcyI6WyJmb28uanMiLCJiYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O1VBQ0c7Ozs7Ozs7Ozs7Ozs7O3NCQ0RIO3NCQUNBIn0=
```

## API

### addMappings(sourceFile, mappings, offset)

```
/**
 * Adds the given mappings to the generator and offsets them if offset is given 
 *
 * @name addMappings
 * @function
 * @param sourceFile {String} name of the source file
 * @param mappings {Array{{Object}} each object has the form { original: { line: _, column: _ }, generated: { line: _, column: _ } }
 * @param offset {Object} offset to apply to each mapping. Has the form { line: _, column: _ }
 * @return {Object} the generator to allow chaining
 */
```

### addGeneratedMappings(sourceFile, source, offset)

```
/**
 * Generates mappings for the given source and adds them, assuming that no translation from original to generated is necessary.
 *
 * @name addGeneratedMappings
 * @function
 * @param sourceFile {String} name of the source file
 * @param source {String} source of the file
 * @param offset {Object} offset to apply to each mapping. Has the form { line: _, column: _ }
 * @return {Object} the generator to allow chaining
 */
```

### addSourceContent(sourceFile, sourceContent)

```
/**
 * Adds source content for the given source file.
 * 
 * @name addSourceContent
 * @function
 * @param sourceFile {String} The source file for which a mapping is included
 * @param sourceContent {String} The content of the source file
 * @return {Object} The generator to allow chaining
 */
```


### base64Encode()

```
/**
 * @name base64Encode
 * @function
 * @return {String} bas64 encoded representation of the added mappings
 */
```

If source contents were added, this will be included in the encoded mappings.

### inlineMappingUrl()

```
/**
 * @name inlineMappingUrl
 * @function
 * @return {String} comment with base64 encoded representation of the added mappings. Can be inlined at the end of the generated file. 
 */
```
