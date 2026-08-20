//// [tests/cases/conformance/salsa/constructorNameInAccessor.ts] ////

//// [constructorNameInAccessor.ts]
class C1 {
    get constructor() { return }
    set constructor(value) {}
}


//// [constructorNameInAccessor.js]
"use strict";
class C1 {
    get constructor() { return; }
    set constructor(value) { }
}
