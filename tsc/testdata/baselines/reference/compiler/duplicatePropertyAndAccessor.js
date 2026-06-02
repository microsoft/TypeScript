//// [tests/cases/compiler/duplicatePropertyAndAccessor.ts] ////

//// [duplicatePropertyAndAccessor.ts]
// https://github.com/microsoft/typescript-go/issues/4130

class C {
  y: number = 2;
  accessor y: number = 3;
}


//// [duplicatePropertyAndAccessor.js]
"use strict";
// https://github.com/microsoft/typescript-go/issues/4130
class C {
    y = 2;
    accessor y = 3;
}


//// [duplicatePropertyAndAccessor.d.ts]
declare class C {
    y: number;
    accessor y: number;
}
