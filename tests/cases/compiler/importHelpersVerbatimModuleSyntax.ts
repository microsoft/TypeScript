// @importHelpers: true
// @target: es2017
// @module: preserve
// @moduleResolution: bundler
// @verbatimModuleSyntax: true

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
export declare var __rest: any;

// @Filename: /node_modules/tslib/modules/package.json
{ "type": "module" }

// @Filename: /node_modules/tslib/modules/index.d.ts
export {};

// @Filename: /main.cts
function foo(args: any) {
  const { bar, ...extraArgs } = args;
  return extraArgs;
}
export = foo;
