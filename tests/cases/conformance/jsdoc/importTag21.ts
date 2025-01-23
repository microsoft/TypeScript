// @noEmit: true
// @checkJs: true
// @allowJs: true
// @module: preserve
// @noTypesAndSymbols: true

// @Filename: node_modules/tslib/package.json
{
  "name": "tslib",
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

// @Filename: node_modules/tslib/modules/index.d.ts
export {};

// @Filename: node_modules/tslib/tslib.d.ts
export {};

// @Filename: test.js
/** @import * as tslib from "tslib" */
/** @type {typeof tslib} T */