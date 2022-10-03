//// [modularizeLibrary_UsingES5LibAndES6ArrayLib.ts]
// No error
function f(x: number, y: number, z: number) {
    return Array.from(arguments);
}

f(1, 2, 3);

//// [modularizeLibrary_UsingES5LibAndES6ArrayLib.js]
// No error
function f(x, y, z) {
    return Array.from(arguments);
}
f(1, 2, 3);
