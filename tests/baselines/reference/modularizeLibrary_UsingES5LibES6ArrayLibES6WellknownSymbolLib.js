//// [tests/cases/compiler/modularizeLibrary_UsingES5LibES6ArrayLibES6WellknownSymbolLib.ts] ////

//// [modularizeLibrary_UsingES5LibES6ArrayLibES6WellknownSymbolLib.ts]
function f(x: number, y: number, z: number) {
    return Array.from(arguments);
}

f(1, 2, 3);   // no error
let a = ['c', 'd'];
a[Symbol.isConcatSpreadable] = false;

//// [modularizeLibrary_UsingES5LibES6ArrayLibES6WellknownSymbolLib.js]
function f(x, y, z) {
    return Array.from(arguments);
}
f(1, 2, 3); // no error
var a = ['c', 'd'];
a[Symbol.isConcatSpreadable] = false;
