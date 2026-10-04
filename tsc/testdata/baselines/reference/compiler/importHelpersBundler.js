//// [tests/cases/compiler/importHelpersBundler.ts] ////

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
export {};

//// [package.json]
{ "type": "module" }

//// [index.d.ts]
export declare var __rest: any;

//// [main.ts]
export function foo(args: any) {
  const { bar, ...extraArgs } = args;
  return extraArgs;
}


//// [main.js]
import { __rest } from "tslib";
export function foo(args) {
    const { bar } = args, extraArgs = __rest(args, ["bar"]);
    return extraArgs;
}
