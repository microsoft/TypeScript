//// [parserAccessibilityAfterStatic1.ts]
class Outer
{
static public intI: number;
}


//// [parserAccessibilityAfterStatic1.js]
var Outer = (function () {
    function Outer() {
    }
    return Outer;
}());
