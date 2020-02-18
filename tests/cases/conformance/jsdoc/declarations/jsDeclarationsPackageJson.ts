// @allowJs: true
// @checkJs: true
// @target: es5
// @resolveJsonModule: true
// @outDir: ./out
// @declaration: true
// @filename: index.js
const j = require("./package.json");
module.exports = j;
// @filename: package.json
{
    "name": "pkg",
    "version": "0.1.0",
    "description": "A package",
    "main": "./dist/index.js",
    "bin": {
      "cli": "./bin/cli.js",
    },
    "engines": {
      "node": ">=0"
    },
    "scripts": {
      "scriptname": "run && run again",
    },
    "devDependencies": {
      "@ns/dep": "0.1.2",
    },
    "dependencies": {
      "dep": "1.2.3",
    },
    "repository": "microsoft/TypeScript",
    "keywords": [
      "kw"
    ],
    "author": "Auth",
    "license": "See Licensce",
    "homepage": "https://site",
    "config": {
      "o": ["a"]
    }
}
  