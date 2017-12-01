//// [alwaysStrictNoImplicitUseStrict.ts]
module M {
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
