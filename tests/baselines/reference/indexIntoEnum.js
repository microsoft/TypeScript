//// [indexIntoEnum.ts]
module M {

    enum E { }

    var x = E[0];
}

//// [indexIntoEnum.js]
var M = M || (M = {});
(function (M) {
    var E = E || (E = {});
    (function (E) {
    })(E);
    var x = E[0];
})(M);
