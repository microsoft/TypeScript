//// [tests/cases/compiler/modularizeLibrary_ErrorFromUsingES6ArrayWithOnlyES6ArrayLib.ts] ////

//// [modularizeLibrary_ErrorFromUsingES6ArrayWithOnlyES6ArrayLib.ts]
// Error missing basic JavaScript objects
function f(x: number, y: number, z: number) {
    return Array.from(arguments);
}

f(1, 2, 3);


//// [modularizeLibrary_ErrorFromUsingES6ArrayWithOnlyES6ArrayLib.js]
// Error missing basic JavaScript objects
function f(x, y, z) {
    return Array.from(arguments);
}
f(1, 2, 3);
