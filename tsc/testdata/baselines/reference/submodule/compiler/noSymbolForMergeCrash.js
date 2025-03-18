//// [tests/cases/compiler/noSymbolForMergeCrash.ts] ////

//// [initial.ts]
interface A { }
namespace A {}

//// [final.ts]
type A = {}


//// [initial.js]
//// [final.js]
