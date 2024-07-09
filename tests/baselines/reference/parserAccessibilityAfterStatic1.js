//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/AccessibilityAfterStatic/parserAccessibilityAfterStatic1.ts] ////

//// [parserAccessibilityAfterStatic1.ts]
class Outer
{
static public intI: number;
}


//// [parserAccessibilityAfterStatic1.js]
var Outer = /** @class */ (function () {
    function Outer() {
    }
    return Outer;
}());
