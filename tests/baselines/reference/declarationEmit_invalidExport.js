//// [declarationEmit_invalidExport.ts]

if (false) {
  export var myClass = 0;
}
export type MyClass = typeof myClass;
}


//// [declarationEmit_invalidExport.js]
"use strict";
if (false) {
    exports.myClass = 0;
}
