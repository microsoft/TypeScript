//// [tests/cases/compiler/exportDefaultModule.ts] ////

//// [a.ts]
export default module A {
    export const Foo = 1;
}

//// [b.ts]
import A from "./a"


//// [a.js]
"use strict";
exports.__esModule = true;
exports.A = void 0;
var A;
(function (A) {
    A.Foo = 1;
})(A = exports.A || (exports.A = {}));
//// [b.js]
"use strict";
exports.__esModule = true;
