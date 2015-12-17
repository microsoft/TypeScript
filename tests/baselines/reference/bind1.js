//// [bind1.ts]
module M {
    export class C implements I {} // this should be an unresolved symbol I error
}



//// [bind1.js]
var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        return C;
    }());
    M.C = C; // this should be an unresolved symbol I error
})(M || (M = {}));
