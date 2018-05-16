'use strict';

var convert      =  require('convert-source-map');
var combine      =  require('..');

var foo = { 
  version        :  3,
  file           :  'foo.js',
  sourceRoot     :  '',
  sources        :  [ 'foo.coffee' ],
  names          :  [],
  mappings       :  ';AAAA;CAAA;CAAA,CAAA,CAAA,IAAO,GAAK;CAAZ',
  sourcesContent :  [ 'console.log(require \'./bar.js\')\n' ] };

var bar = { 
  version        :  3,
  file           :  'bar.js',
  sourceRoot     :  '',
  sources        :  [ 'bar.coffee' ],
  names          :  [],
  mappings       :  ';AAAA;CAAA;CAAA,CAAA,CAAA,IAAO,GAAK;CAAZ',
  sourcesContent :  [ 'console.log(alert \'alerts suck\')\n' ] };


var fooComment = convert.fromObject(foo).toComment();
var barComment = convert.fromObject(bar).toComment();

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
console.log('Combined source maps:\n', sm);
console.log('\nMappings:\n', sm.mappings);
