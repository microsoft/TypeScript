//// [parserAccessibilityAfterStatic3.ts]
class Outer
{
static public = 1;
}


//// [parserAccessibilityAfterStatic3.js]
var Outer = /** @class */ (function () {
    function Outer() {
    }
    (function () {
        Outer.public = 1;
    }).call(Outer);
    return Outer;
}());
