//// [tests/cases/compiler/moduleRedifinitionErrors.ts] ////

//// [moduleRedifinitionErrors.ts]
class A {
}
namespace A {
}


//// [moduleRedifinitionErrors.js]
"use strict";
class A {
}
