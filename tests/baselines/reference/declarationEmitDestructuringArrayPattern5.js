//// [tests/cases/compiler/declarationEmitDestructuringArrayPattern5.ts] ////

//// [declarationEmitDestructuringArrayPattern5.ts]
var [, , z] = [1, 2, 4];
var [, a, , ] = [3, 4, 5];
var [, , [, b, ]] = [3,5,[0, 1]];

//// [declarationEmitDestructuringArrayPattern5.js]
var _a = [1, 2, 4], z = _a[2];
var _b = [3, 4, 5], a = _b[1];
var _c = [3, 5, [0, 1]], _d = _c[2], b = _d[1];


//// [declarationEmitDestructuringArrayPattern5.d.ts]
declare var z: number;
declare var a: number;
declare var b: number;
