//// [tests/cases/compiler/declarationEmitInvalidExport.ts] ////

//// [declarationEmitInvalidExport.ts]
if (false) {
  export var myClass = 0;
}
export type MyClass = typeof myClass;
}


//// [declarationEmitInvalidExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (false) {
    exports.myClass = 0;
}
