'use strict';
var path = require('path'),
  detectNewline = require('detect-newline');

function unixStylePath(filePath) {
  return filePath.split(path.sep).join('/');
}

var PLUGIN_NAME = require('../package.json').name;

var urlRegex = /^(https?|webpack(-[^:]+)?):\/\//;

var debug = require('./debug').spawn('utils');
/*
So reusing the same ref for a regex (with global (g)) is from a poor decision in js.
See http://stackoverflow.com/questions/10229144/bug-with-regexp-in-javascript-when-do-global-search

So we either need to use a new instance of a regex everywhere.
*/
var sourceMapUrlRegEx = function(){ return /\/\/\# sourceMappingURL\=.*/g;};


var getCommentFormatter = function (file) {
  var extension = file.relative.split('.').pop(),
    fileContents =  file.contents.toString(),
    newline =  detectNewline.graceful(fileContents || ''),
    commentFormatter = function(url) {
      return '';
    };

  if (file.sourceMap.preExistingComment){
    debug(function() { return 'preExistingComment commentFormatter'; });
    commentFormatter = function(url) {
      return "//# sourceMappingURL=" + url + newline;
    };
    return commentFormatter;
  }

  switch (extension) {
    case 'css':
      debug(function() { return 'css commentFormatter';});
      commentFormatter = function(url) {
        return newline + "/*# sourceMappingURL=" + url + " */" + newline;
      };
      break;
    case 'js':
      debug(function() { return 'js commentFormatter'; });
      commentFormatter = function(url) {
        return newline + "//# sourceMappingURL=" + url + newline;
      };
      break;
    default:
      debug(function() { return 'unknown commentFormatter'; });
  }

  return commentFormatter;
};

var getInlinePreExisting = function(fileContent){
  if(sourceMapUrlRegEx().test(fileContent)){
    debug(function() { return 'has preExisting'; });
    return fileContent.match(sourceMapUrlRegEx())[0];
  }
};

var exceptionToString = function (exception) {
  return exception.message || '';
};

module.exports = {
  unixStylePath: unixStylePath,
  PLUGIN_NAME: PLUGIN_NAME,
  urlRegex: urlRegex,
  sourceMapUrlRegEx: sourceMapUrlRegEx,
  getCommentFormatter: getCommentFormatter,
  getInlinePreExisting: getInlinePreExisting,
  exceptionToString: exceptionToString
};
