// @checkJs: true
// @outDir: ./out
// @module: commonjs
// @importHelpers: true
// @verbatimModuleSyntax: true,false

// @Filename: /node_modules/tslib/package.json
{
  "name": "tslib",
  "main": "tslib.js",
  "module": "tslib.es6.js",
  "jsnext:main": "tslib.es6.js",
  "typings": "tslib.d.ts",
  "exports": {
      ".": {
          "module": {
              "types": "./modules/index.d.ts",
              "default": "./tslib.es6.mjs"
          },
          "import": {
              "node": "./modules/index.js",
              "default": {
                  "types": "./modules/index.d.ts",
                  "default": "./tslib.es6.mjs"
              }
          },
          "default": "./tslib.js"
      },
      "./*": "./*",
      "./": "./"
  }
}

// @Filename: /node_modules/tslib/tslib.d.ts
export declare var __extends: any;

// @Filename: /node_modules/tslib/modules/package.json
{ "type": "module" }

// @Filename: /node_modules/tslib/modules/index.d.ts
export {};

// @Filename: /index.js
class Foo {}

class Bar extends Foo {}

module.exports = Bar;
