//// [tests/cases/compiler/classOverloadForFunction.ts] ////

//// [classOverloadForFunction.ts]
class foo { };
function foo() {}


//// [classOverloadForFunction.js]
"use strict";
var foo = /** @class */ (function () {
    function foo() {
    }
    return foo;
}());
;
function foo() { }
