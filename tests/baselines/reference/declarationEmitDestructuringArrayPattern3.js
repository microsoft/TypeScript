//// [tests/cases/compiler/declarationEmitDestructuringArrayPattern3.ts] ////

//// [declarationEmitDestructuringArrayPattern3.ts]
module M {
    export var [a, b] = [1, 2];
}

//// [declarationEmitDestructuringArrayPattern3.js]
var M;
(function (M) {
    var _a;
    _a = [1, 2], M.a = _a[0], M.b = _a[1];
})(M || (M = {}));


//// [declarationEmitDestructuringArrayPattern3.d.ts]
declare namespace M {
    var a: number, b: number;
}
