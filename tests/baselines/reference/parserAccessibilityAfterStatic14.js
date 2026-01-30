//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/AccessibilityAfterStatic/parserAccessibilityAfterStatic14.ts] ////

//// [parserAccessibilityAfterStatic14.ts]
class Outer
{
static public<T>() {}
}


//// [parserAccessibilityAfterStatic14.js]
"use strict";
var Outer = /** @class */ (function () {
    function Outer() {
    }
    Outer.public = function () { };
    return Outer;
}());
