//// [tests/cases/compiler/moduleAsBaseType.ts] ////

//// [moduleAsBaseType.ts]
namespace M {}
class C extends M {}
interface I extends M { }
class C2 implements M { }

//// [moduleAsBaseType.js]
"use strict";
class C extends M {
}
class C2 {
}
