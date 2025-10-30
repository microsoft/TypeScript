//// [tests/cases/compiler/indexIntoEnum.ts] ////

//// [indexIntoEnum.ts]
namespace M {

    enum E { }

    var x = E[0];
}

//// [indexIntoEnum.js]
var M;
(function (M) {
    var E;
    (function (E) {
    })(E || (E = {}));
    var x = E[0];
})(M || (M = {}));
