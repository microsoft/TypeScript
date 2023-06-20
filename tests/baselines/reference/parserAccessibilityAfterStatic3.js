//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/AccessibilityAfterStatic/parserAccessibilityAfterStatic3.ts] ////

//// [parserAccessibilityAfterStatic3.ts]
class Outer
{
static public = 1;
}


//// [parserAccessibilityAfterStatic3.js]
var Outer = /** @class */ (function () {
    function Outer() {
    }
    Outer.public = 1;
    return Outer;
}());
