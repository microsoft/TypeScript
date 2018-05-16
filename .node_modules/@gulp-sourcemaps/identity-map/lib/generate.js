'use strict';

var css = require('css');
var acorn = require('acorn');
var SourceMapGenerator = require('source-map').SourceMapGenerator;

function generateJs(sourcePath, fileContent) {
  var generator = new SourceMapGenerator({ file: sourcePath });
  var tokenizer = acorn.tokenizer(fileContent, { allowHashBang: true, locations: true });

  while (true) {
    var token = tokenizer.getToken();

    if (token.type.label === 'eof') {
      break;
    }
    var mapping = {
      original: token.loc.start,
      generated: token.loc.start,
      source: sourcePath,
    };
    if (token.type.label === 'name') {
      mapping.name = token.value;
    }
    generator.addMapping(mapping);
  }
  generator.setSourceContent(sourcePath, fileContent);

  return generator.toJSON();
}

function generateCss(sourcePath, fileContent) {
  var generator = new SourceMapGenerator({ file: sourcePath });
  var ast = css.parse(fileContent, { silent: true });

  function registerTokens(ast) {
    if (ast.position) {
      generator.addMapping({
        original: ast.position.start,
        generated: ast.position.start,
        source: sourcePath,
      });
    }

    for (var key in ast) {
      if (key === 'position' || !ast[key]) {
        break;
      }
      if (Object.prototype.toString.call(ast[key]) === '[object Object]') {
        registerTokens(ast[key]);
      } else if (Array.isArray(ast[key])) {
        ast[key].forEach(registerTokens);
      }
    }
  }
  registerTokens(ast);
  generator.setSourceContent(sourcePath, fileContent);

  return generator.toJSON();
}

module.exports = {
  js: generateJs,
  css: generateCss,
};
