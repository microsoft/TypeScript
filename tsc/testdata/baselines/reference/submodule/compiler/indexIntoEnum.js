//// [tests/cases/compiler/indexIntoEnum.ts] ////

//// [indexIntoEnum.ts]
namespace M {

    enum E { }

    var x = E[0];
}

//// [indexIntoEnum.js]
"use strict";
var M;
(function (M) {
    let E;
    (function (E) {
    })(E || (E = {}));
    var x = E[0];
})(M || (M = {}));
