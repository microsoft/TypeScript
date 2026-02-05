//// [tests/cases/compiler/noEmitHelpers.ts] ////

//// [noEmitHelpers.ts]
class A { }
class B extends A { }


//// [noEmitHelpers.js]
"use strict";
class A {
}
class B extends A {
}
