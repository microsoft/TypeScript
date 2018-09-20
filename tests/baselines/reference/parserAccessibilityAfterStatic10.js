//// [parserAccessibilityAfterStatic10.ts]
class Outer
{
static public intI<T>() {}
}


//// [parserAccessibilityAfterStatic10.js]
var Outer = /** @class */ (function () {
    function Outer() {
    }
    Outer.intI = function () { };
    return Outer;
}());
