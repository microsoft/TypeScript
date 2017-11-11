//// [moduleIdentifiers.ts]
module M {
    interface P { x: number; y: number; }
    export var a = 1
}

//var p: M.P;
//var m: M = M;
var x1 = M.a;
//var x2 = m.a;
//var q: m.P;

//// [moduleIdentifiers.js]
var M;
(function (M) {
    M.a = 1;
})(M || (M = {}));
//var p: M.P;
//var m: M = M;
var x1 = M.a;
//var x2 = m.a;
//var q: m.P;
