//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock24.ts] ////

//// [classStaticBlock24.ts]
export class C {
  static x: number;
  static {
    C.x = 1;
  }
}


//// [classStaticBlock24.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.C = void 0;
    class C {
        static x;
        static {
            C.x = 1;
        }
    }
    exports.C = C;
});
