//// [tests/cases/compiler/exportDefaultAbstractClass.ts] ////

//// [a.ts]
export default abstract class A {}

//// [b.ts]
import A from './a'


//// [a.js]
"use strict";
exports.__esModule = true;
var A = (function () {
    function A() {
    }
    return A;
}());
exports["default"] = A;
//// [b.js]
"use strict";
exports.__esModule = true;
