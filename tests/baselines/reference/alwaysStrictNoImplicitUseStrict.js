//// [tests/cases/compiler/alwaysStrictNoImplicitUseStrict.ts] ////

//// [alwaysStrictNoImplicitUseStrict.ts]
namespace M {
    export function f() {
        var arguments = [];
    }
}

//// [alwaysStrictNoImplicitUseStrict.js]
"use strict";
var M;
(function (M) {
    function f() {
        var arguments = [];
    }
    M.f = f;
})(M || (M = {}));
