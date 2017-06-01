//// [parserAccessibilityAfterStatic3.ts]
class Outer
{
static public = 1;
}


//// [parserAccessibilityAfterStatic3.js]
var Outer = (function () {
    function Outer() {
    }
    Outer.public = 1;
    return Outer;
}());
