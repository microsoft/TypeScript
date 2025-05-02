//// [tests/cases/compiler/multipleExports.ts] ////

//// [multipleExports.ts]
export module M {
    export var v = 0;
    export let x;
}

const x = 0;
export module M {
    v;
    export {x};
}


//// [multipleExports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.M = void 0;
var M;
(function (M) {
    M.v = 0;
})(M || (exports.M = M = {}));
var x = 0;
(function (M) {
    M.v;
})(M || (exports.M = M = {}));
