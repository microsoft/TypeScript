'use strict';

var utils = require('../utils');
var rootDebug = require('../debug');
var convert = require('convert-source-map');
var stripBom = require('strip-bom-string');
var urlRegex = utils.urlRegex;
var fs = require('graceful-fs');
var path = require('path');
var unixStylePath = utils.unixStylePath;
var exceptionToString = utils.exceptionToString;

module.exports = function(options, file, fileContent) {

  function loadMaps() {

    var sources = {
      path: '',
      map: null,
      content: fileContent,
      preExistingComment: null
    };

    _getInlineSources(sources);
    if (!sources.map) // ahh not inline, so try file
      _getFileSources(sources);

    _fixSources(sources);

    return sources;
  }

  function _fixSources(sources) {
    var debug = rootDebug.spawn('init:internals:loadMaps:_fixSources');

    // fix source paths and sourceContent for imported source map
    if (sources.map) {
      sources.map.sourcesContent = sources.map.sourcesContent || [];
      sources.map.sources.forEach(function(source, i) {
        if (source.match(urlRegex)) {
          sources.map.sourcesContent[i] = sources.map.sourcesContent[i] || null;
          return;
        }
        var absPath = path.resolve(sources.path, source);
        sources.map.sources[i] = unixStylePath(path.relative(file.base, absPath));

        if (!sources.map.sourcesContent[i]) {
          var sourceContent = null;
          if (sources.map.sourceRoot) {
            if (sources.map.sourceRoot.match(urlRegex)) {
              sources.map.sourcesContent[i] = null;
              return;
            }
            absPath = path.resolve(sources.path, sources.map.sourceRoot, source);
          }

          // if current file: use content
          if (absPath === file.path) {
            sourceContent = sources.content;
          } else { //attempt load content from file
            try {
              debug(function() { return 'No source content for "' + source + '". Loading from file.'; });
              sourceContent = stripBom(fs.readFileSync(absPath, 'utf8'));
            } catch (e) {
              debug(function() { return 'warn: source file not found: ' + absPath; });
            }
          }
          sources.map.sourcesContent[i] = sourceContent;
        }

      });
      // remove source map comment from source
      file.contents = new Buffer(sources.content, 'utf8');
    }

  }

  function _getInlineSources(sources) {
    var debug = rootDebug.spawn('init:internals:loadMaps:_getInlineSources');

    sources.preExistingComment = utils.getInlinePreExisting(sources.content);
    // Try to read inline source map
    sources.map = convert.fromSource(sources.content, options.largeFile);

    if (!sources.map)
      return sources;

    sources.map = sources.map.toObject();
    // sources in map are relative to the source file
    sources.path = path.dirname(file.path);
    if (!options.largeFile) {
      debug('comment REMOVED');
      sources.content = convert.removeComments(sources.content);
    }
  }

  function _getFileSources(sources) {
    var debug = rootDebug.spawn('init:internals:loadMaps:_getFileSources');

    // look for source map comment referencing a source map file
    var mapComment = convert.mapFileCommentRegex.exec(sources.content);

    var mapFile;
    if (mapComment) {
      sources.preExistingComment = mapComment[1] || mapComment[2];
      mapFile = path.resolve(path.dirname(file.path), sources.preExistingComment);
      sources.content = convert.removeMapFileComments(sources.content);
      // if no comment try map file with same name as source file
    } else {
      mapFile = file.path + '.map';
    }

    // sources in external map are relative to map file
    sources.path = path.dirname(mapFile);

    try {
      sources.map = JSON.parse(stripBom(fs.readFileSync(mapFile, 'utf8')));
    } catch (e) {
      debug(function() { 
        return 'warn: external source map not found or invalid: ' + mapFile + ' ' + exceptionToString(e);
      });
    }
  }

  return {
    loadMaps: loadMaps
  };
};
