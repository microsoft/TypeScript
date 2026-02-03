//// [tests/cases/compiler/importHelpersCommonJSJavaScript.ts] ////

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
export declare var __extends: any;

//// [package.json]
{ "type": "module" }

//// [index.d.ts]
export {};

//// [index.js]
class Foo {}

class Bar extends Foo {}

module.exports = Bar;


//// [index.js]
var tslib_1 = require("tslib");
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var Bar = /** @class */ (function (_super) {
    tslib_1.__extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bar;
}(Foo));
module.exports = Bar;
