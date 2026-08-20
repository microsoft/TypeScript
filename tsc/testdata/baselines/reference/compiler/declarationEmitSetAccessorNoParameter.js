//// [tests/cases/compiler/declarationEmitSetAccessorNoParameter.ts] ////

//// [declarationEmitSetAccessorNoParameter.ts]
class C {
  set foo() { }
}


//// [declarationEmitSetAccessorNoParameter.js]
"use strict";
class C {
    set foo() { }
}


//// [declarationEmitSetAccessorNoParameter.d.ts]
declare class C {
    set foo(value: any);
}
