//// [alwaysStrictModule.ts]
module M {
    export function f() {
        var arguments = [];
    }
}

//// [alwaysStrictModule.js]
"use strict";
var M = M || (M = {});
(function (M) {
    function f() {
        var arguments = [];
    }
    M.f = f;
})(M);
