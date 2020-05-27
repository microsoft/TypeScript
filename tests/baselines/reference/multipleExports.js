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
exports.__esModule = true;
exports.M = void 0;
var M;
(function (M) {
    M.v = 0;
})(M = exports.M || (exports.M = {}));
var x = 0;
(function (M) {
    M.v;
})(M = exports.M || (exports.M = {}));
