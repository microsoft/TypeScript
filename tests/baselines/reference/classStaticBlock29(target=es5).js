//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock29.ts] ////

//// [classStaticBlock29.ts]
// https://github.com/microsoft/TypeScript/issues/60879

export default class {
  static demo: number;
  static {
    this.demo = 1;
  }
}

export function makeCls() {
  return class {
    static demo: number;
    static {
      this.demo = 1;
    }
  };
}


//// [classStaticBlock29.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/60879
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCls = makeCls;
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    return default_1;
}());
_a = default_1;
(function () {
    _a.demo = 1;
})();
exports.default = default_1;
function makeCls() {
    var _b;
    return _b = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        (function () {
            _b.demo = 1;
        })(),
        _b;
}
