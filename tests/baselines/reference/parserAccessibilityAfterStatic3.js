//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/AccessibilityAfterStatic/parserAccessibilityAfterStatic3.ts] ////

//// [parserAccessibilityAfterStatic3.ts]
class Outer
{
static public = 1;
}


//// [parserAccessibilityAfterStatic3.js]
"use strict";
var Outer = /** @class */ (function () {
    function Outer() {
    }
    Outer.public = 1;
    return Outer;
}());
