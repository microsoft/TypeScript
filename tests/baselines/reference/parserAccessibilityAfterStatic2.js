//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/AccessibilityAfterStatic/parserAccessibilityAfterStatic2.ts] ////

//// [parserAccessibilityAfterStatic2.ts]
class Outer
{
static public;
}


//// [parserAccessibilityAfterStatic2.js]
var Outer = /** @class */ (function () {
    function Outer() {
    }
    return Outer;
}());
