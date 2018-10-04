//// [declarationEmitInvalidExport.ts]
if (false) {
  export var myClass = 0;
}
export type MyClass = typeof myClass;
}


//// [declarationEmitInvalidExport.js]
"use strict";
exports.__esModule = true;
if (false) {
    export var myClass = 0;
}
