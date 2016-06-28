//// [parserAccessibilityAfterStatic2.ts]
class Outer
{
static public;
}


//// [parserAccessibilityAfterStatic2.js]
var Outer = (function () {
    function Outer() {
    }
    return Outer;
}());
