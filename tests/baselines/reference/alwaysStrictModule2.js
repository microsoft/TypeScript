//// [tests/cases/compiler/alwaysStrictModule2.ts] ////

//// [a.ts]
module M {
    export function f() {
        var arguments = [];
    }
}

//// [b.ts]
module M {
    export function f2() {
        var arguments = [];
    }
}

//// [out.js]
"use strict";
var M;
(function (M) {
    function f() {
        var arguments = [];
    }
    M.f = f;
})(M || (M = {}));
var M;
(function (M) {
    function f2() {
        var arguments = [];
    }
    M.f2 = f2;
})(M || (M = {}));
