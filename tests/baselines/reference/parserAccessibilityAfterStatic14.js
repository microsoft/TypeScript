//// [parserAccessibilityAfterStatic14.ts]
class Outer
{
static public<T>() {}
}


//// [parserAccessibilityAfterStatic14.js]
var Outer = (function () {
    function Outer() {
    }
    Outer.public = function () { };
    return Outer;
}());
