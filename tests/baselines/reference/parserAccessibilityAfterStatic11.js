//// [parserAccessibilityAfterStatic11.ts]
class Outer
{
static public() {}
}


//// [parserAccessibilityAfterStatic11.js]
var Outer = (function () {
    function Outer() {
    }
    Outer.public = function () { };
    return Outer;
}());
