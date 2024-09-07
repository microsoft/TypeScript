//// [tests/cases/compiler/declarationEmitDestructuringArrayPattern5.ts] ////

//// [declarationEmitDestructuringArrayPattern5.ts]
var [, , z] = [1, 2, 4];
var [, a, , ] = [3, 4, 5];
var [, , [, b, ]] = [3,5,[0, 1]];

//// [declarationEmitDestructuringArrayPattern5.js]
var _a;
var _b = [1, 2, 4], z = (_b[0], _b[1], _b[2]);
var _c = [3, 4, 5], a = (_a = (_c[0], _c[1]), _c[2], _a);
var _d = [3, 5, [0, 1]], _e = (_d[0], _d[1], _d[2]), b = (_e[0], _e[1]);


//// [declarationEmitDestructuringArrayPattern5.d.ts]
declare var z: number;
declare var a: number;
declare var b: number;
