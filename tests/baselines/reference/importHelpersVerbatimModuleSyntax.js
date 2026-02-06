//// [tests/cases/compiler/importHelpersVerbatimModuleSyntax.ts] ////

//// [package.json]
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

//// [tslib.d.ts]
export declare var __rest: any;

//// [package.json]
{ "type": "module" }

//// [index.d.ts]
export {};

//// [main.cts]
function foo(args: any) {
  const { bar, ...extraArgs } = args;
  return extraArgs;
}
export = foo;


//// [main.cjs]
const tslib_1 = require("tslib");
function foo(args) {
    const { bar } = args, extraArgs = tslib_1.__rest(args, ["bar"]);
    return extraArgs;
}
module.exports = foo;
