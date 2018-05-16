'use strict';

var path            =  require('path');
var convert         =  require('convert-source-map');
var memoize         =  require('lodash.memoize');
var createGenerator =  require('inline-source-map');
var pathIsAbsolute  =  require('./lib/path-is-absolute');
var mappingsFromMap =  require('./lib/mappings-from-map');

var protocolRx = /^[a-z]+:\/\//;

/**
 * Rebases a relative path in 'sourceFile' to be relative
 * to the path where 'sourceFile' is located.
 *
 * This is necessary before adding relative paths to the
 * new combined map to ensure all paths are relative to their
 * original source.
 *
 * The 'sourceRoot' from the original source map is joined
 * as well to ensure the complete path.
 *
 * Resulting paths that are absolute are passed along directly.
 *
 * @param sourceFile {String} path to the original source file that references a map
 * @param relativeRoot {String} sourceRoot in sourceFile's map to combine with relativePath
 * @param relativePath {String} source path from sourceFile's map
 */
var rebaseRelativePath = memoize(function(sourceFile, relativeRoot, relativePath) {
  if (!relativePath) {
    return relativePath;
  }

  // join relative path to root (e.g. 'src/' + 'file.js')
  var relativeRootedPath = relativeRoot ? path.join(relativeRoot, relativePath) : relativePath;
  relativeRootedPath = relativeRootedPath.replace(/\\/g, '/');
  sourceFile = sourceFile.replace(/\\/g, '/');

  if (sourceFile === relativeRootedPath ||    // same path,
      pathIsAbsolute(relativeRootedPath) ||   // absolute path, nor
      protocolRx.test(relativeRootedPath)) {  // absolute protocol need rebasing
    return relativeRootedPath;
  }

  // make relative to source file
  return path.join(path.dirname(sourceFile), relativeRootedPath).replace(/\\/g, '/');
}, function(a, b, c) {
  return a + '::' + b + '::' + c;
});

function resolveMap(source) {
  var gen = convert.fromSource(source);
  return gen ? gen.toObject() : null;
}

function hasInlinedSource(existingMap) {
  return existingMap.sourcesContent && !!existingMap.sourcesContent[0];
}

function Combiner(file, sourceRoot) {
  // since we include the original code in the map sourceRoot actually not needed
  this.generator = createGenerator({ file: file || 'generated.js', sourceRoot: sourceRoot });
}

Combiner.prototype._addGeneratedMap = function (sourceFile, source, offset) {
  this.generator.addGeneratedMappings(sourceFile, source, offset);
  this.generator.addSourceContent(sourceFile, source);
  return this;
};

Combiner.prototype._addExistingMap = function (sourceFile, source, existingMap, offset) {
  var mappings = mappingsFromMap(existingMap);

  // add all of the sources from the map
  for (var i = 0, len = existingMap.sources.length; i < len; i++) {
    if (!existingMap.sourcesContent) continue;

    this.generator.addSourceContent(
      rebaseRelativePath(sourceFile, existingMap.sourceRoot, existingMap.sources[i]),
      existingMap.sourcesContent[i]);
  }

  // add the mappings, preserving the original mapping 'source'
  mappings.forEach(function(mapping) {
    // Add the mappings one at a time because 'inline-source-map' doesn't handle
    // mapping source filenames. The mapping.source already takes sourceRoot into account
    // per the SMConsumer.eachMapping function, so pass null for the root here.
    this.generator.addMappings(
      rebaseRelativePath(sourceFile, null, mapping.source), [mapping], offset);
  }, this);

  return this;
};

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
Combiner.prototype.addFile = function (opts, offset) {

  offset = offset || {};
  if (!offset.hasOwnProperty('line'))  offset.line    =  0;
  if (!offset.hasOwnProperty('column')) offset.column =  0;

  var existingMap = resolveMap(opts.source);

  return existingMap && hasInlinedSource(existingMap)
    ? this._addExistingMap(opts.sourceFile, opts.source, existingMap, offset)
    : this._addGeneratedMap(opts.sourceFile, opts.source, offset);
};

/**
* @name base64
* @function
* @return {String} base64 encoded combined source map
*/
Combiner.prototype.base64 = function () {
  return this.generator.base64Encode();
};

/**
 * @name comment
 * @function
 * @return {String} base64 encoded sourceMappingUrl comment of the combined source map
 */
Combiner.prototype.comment = function () {
  return this.generator.inlineMappingUrl();
};

/**
 * @name create
 * @function
 * @param file {String} optional name of the generated file
 * @param sourceRoot {String} optional sourceRoot of the map to be generated
 * @return {Object} Combiner instance to which source maps can be added and later combined
 */
exports.create = function (file, sourceRoot) { return new Combiner(file, sourceRoot); };

/**
 * @name removeComments
 * @function
 * @param src
 * @return {String} src with all sourceMappingUrl comments removed
 */
exports.removeComments = function (src) {
  if (!src.replace) return src;
  return src.replace(convert.commentRegex, '').replace(convert.mapFileCommentRegex, '');
};
