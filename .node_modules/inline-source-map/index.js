'use strict';
var SourceMapGenerator = require('source-map').SourceMapGenerator;

function offsetMapping(mapping, offset) {
  return { line: offset.line + mapping.line, column: offset.column + mapping.column };
}

function newlinesIn(src) {
  if (!src) return 0;
  var newlines = src.match(/\n/g);

  return newlines ? newlines.length : 0;
}
 
function Generator(opts) {
  opts = opts || {};
  this.generator = new SourceMapGenerator({ file: opts.file || '', sourceRoot: opts.sourceRoot || '' });
  this.sourcesContent = undefined;
  this.opts = opts;
}

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
Generator.prototype.addMappings = function (sourceFile, mappings, offset) { 
  var generator = this.generator; 

  offset = offset || {};
  offset.line = offset.hasOwnProperty('line') ? offset.line : 0;
  offset.column = offset.hasOwnProperty('column') ? offset.column : 0;

  mappings.forEach(function (m) {
    // only set source if we have original position to handle edgecase (see inline-source-map tests)
    generator.addMapping({
        source    :  m.original ? sourceFile : undefined
      , original  :  m.original
      , generated :  offsetMapping(m.generated, offset)
    });
  });
  return this;
};

/**
 * Generates mappings for the given source, assuming that no translation from original to generated is necessary.
 *
 * @name addGeneratedMappings
 * @function
 * @param sourceFile {String} name of the source file
 * @param source {String} source of the file
 * @param offset {Object} offset to apply to each mapping. Has the form { line: _, column: _ }
 * @return {Object} the generator to allow chaining
 */
Generator.prototype.addGeneratedMappings = function (sourceFile, source, offset) {
  var mappings = []
    , linesToGenerate = newlinesIn(source) + 1;

  for (var line = 1; line <= linesToGenerate; line++) {
    var location = { line: line, column: 0 };
    mappings.push({ original: location, generated: location });
  }

  return this.addMappings(sourceFile, mappings, offset);
};

/**
 * Adds source content for the given source file.
 * 
 * @name addSourceContent
 * @function
 * @param sourceFile {String} The source file for which a mapping is included
 * @param sourcesContent {String} The content of the source file
 * @return {Object} The generator to allow chaining
 */
Generator.prototype.addSourceContent = function (sourceFile, sourcesContent) {
  this.sourcesContent = this.sourcesContent || {};
  this.sourcesContent[sourceFile] = sourcesContent;
  return this;
};

/**
 * @name base64Encode
 * @function
 * @return {String} bas64 encoded representation of the added mappings
 */
Generator.prototype.base64Encode = function () {
  var map = this.toString();
  return new Buffer(map).toString('base64');
};

/**
 * @name inlineMappingUrl
 * @function
 * @return {String} comment with base64 encoded representation of the added mappings. Can be inlined at the end of the generated file. 
 */
Generator.prototype.inlineMappingUrl = function () {
  var charset = this.opts.charset || 'utf-8';
  return '//# sourceMappingURL=data:application/json;charset=' + charset + ';base64,' + this.base64Encode();
};

Generator.prototype.toJSON = function () {
  var map = this.generator.toJSON();
  if (!this.sourcesContent) return map;

  var toSourcesContent = (function (s) {
    if (typeof this.sourcesContent[s] === 'string') {
      return this.sourcesContent[s];
    } else {
      return null;
    }
  }).bind(this);
  map.sourcesContent = map.sources.map(toSourcesContent);
  return map;
};

Generator.prototype.toString = function () {
  return JSON.stringify(this);
};

Generator.prototype._mappings = function () {
  return this.generator._mappings._array;
};

Generator.prototype.gen = function () {
  return this.generator;
};

module.exports = function (opts) { return new Generator(opts); };
module.exports.Generator = Generator;
