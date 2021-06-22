//// [classStaticBlock24.ts]
export class C {
  static x: number;
  static {
    C.x = 1;
  }
}


//// [classStaticBlock24.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var C;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            C = /** @class */ (function () {
                function C() {
                }
                return C;
            }());
            exports_1("C", C);
            (function () {
                C.x = 1;
            })();
        }
    };
});
