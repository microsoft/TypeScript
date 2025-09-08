//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock24.ts] ////

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
            C = class C {
                static x;
                static {
                    C.x = 1;
                }
            };
            exports_1("C", C);
        }
    };
});
