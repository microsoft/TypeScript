//// [tests/cases/compiler/declarationEmitDestructuringArrayPattern3.ts] ////

//// [declarationEmitDestructuringArrayPattern3.ts]
module M {
    export var [a, b] = [1, 2];
}

//// [declarationEmitDestructuringArrayPattern3.js]
var M;
(function (M) {
    [M.a, M.b] = [1, 2];
})(M || (M = {}));
