//// [parserAccessibilityAfterStatic4.ts]
class Outer
{
static public: number;
}


//// [parserAccessibilityAfterStatic4.js]
var Outer = (function () {
    function Outer() {
    }
    return Outer;
}());
