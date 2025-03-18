//// [tests/cases/compiler/declarationEmitDestructuringArrayPattern5.ts] ////

//// [declarationEmitDestructuringArrayPattern5.ts]
var [, , z] = [1, 2, 4];
var [, a, , ] = [3, 4, 5];
var [, , [, b, ]] = [3,5,[0, 1]];

//// [declarationEmitDestructuringArrayPattern5.js]
var [, , z] = [1, 2, 4];
var [, a, ,] = [3, 4, 5];
var [, , [, b,]] = [3, 5, [0, 1]];
