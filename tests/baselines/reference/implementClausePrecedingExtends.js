//// [tests/cases/compiler/implementClausePrecedingExtends.ts] ////

//// [implementClausePrecedingExtends.ts]
class C { foo: number }
class D implements C extends C { }

//// [implementClausePrecedingExtends.js]
"use strict";
class C {
}
class D extends C {
}
