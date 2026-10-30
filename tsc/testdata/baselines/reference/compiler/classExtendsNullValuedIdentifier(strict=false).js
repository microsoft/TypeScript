//// [tests/cases/compiler/classExtendsNullValuedIdentifier.ts] ////

//// [classExtendsNullValuedIdentifier.ts]
const N = null;
class A extends N { constructor() { } }
class B extends (null) { constructor() { } }
class C extends null { constructor() { super(); } }
let n = null;
class D extends n { constructor() { } }


//// [classExtendsNullValuedIdentifier.js]
"use strict";
const N = null;
class A extends N {
    constructor() { }
}
class B extends (null) {
    constructor() { }
}
class C extends null {
    constructor() { super(); }
}
let n = null;
class D extends n {
    constructor() { }
}
