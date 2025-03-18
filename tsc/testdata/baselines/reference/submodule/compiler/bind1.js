//// [tests/cases/compiler/bind1.ts] ////

//// [bind1.ts]
module M {
    export class C implements I {} // this should be an unresolved symbol I error
}



//// [bind1.js]
var M;
(function (M) {
    class C {
    }
    M.C = C;
})(M || (M = {}));
