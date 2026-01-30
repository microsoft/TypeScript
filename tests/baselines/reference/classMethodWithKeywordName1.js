//// [tests/cases/compiler/classMethodWithKeywordName1.ts] ////

//// [classMethodWithKeywordName1.ts]
class C {
 static try() {}
}

//// [classMethodWithKeywordName1.js]
"use strict";
var C = /** @class */ (function () {
    function C() {
    }
    C.try = function () { };
    return C;
}());
