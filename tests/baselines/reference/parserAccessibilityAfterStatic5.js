//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/AccessibilityAfterStatic/parserAccessibilityAfterStatic5.ts] ////

//// [parserAccessibilityAfterStatic5.ts]
class Outer
{
static public
}


//// [parserAccessibilityAfterStatic5.js]
var Outer = /** @class */ (function () {
    function Outer() {
    }
    return Outer;
}());
