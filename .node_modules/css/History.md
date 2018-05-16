2.2.0 / 2015-02-18
====

 * add `parsingErrors` to list errors when parsing with `silent: true`
 * accept EOL characters and all other whitespace characters in `@` rules such
   as `@media`

2.1.0 / 2014-08-05
==================

  * change error message format and add `.reason` property to errors
  * add `inputSourcemaps` option to disable input source map processing
  * use `inherits` for inheritance (fixes some browsers)
  * add `sourcemap: 'generator'` option to return the `SourceMapGenerator`
    object

2.0.0 / 2014-06-18
==================

  * add non-enumerable parent reference to each node
  * drop Component(1) support
  * add support for @custom-media, @host, and @font-face
  * allow commas inside selector functions
  * allow empty property values
  * changed default options.position value to true
  * remove comments from properties and values
  * asserts when selectors are missing
  * added node.position.content property
  * absorb css-parse and css-stringify libraries
  * apply original source maps from source files

1.6.1 / 2014-01-02
==================

  * fix component.json

1.6.0 / 2013-12-21
==================

  * update deps

1.5.0 / 2013-12-03
==================

  * update deps

1.1.0 / 2013-04-04
==================

  * update deps

1.0.7 / 2012-11-21
==================

  * fix component.json

1.0.4 / 2012-11-15
==================

  * update css-stringify

1.0.3 / 2012-09-01
==================

  * add component support

0.0.1 / 2010-01-03
==================

  * Initial release
