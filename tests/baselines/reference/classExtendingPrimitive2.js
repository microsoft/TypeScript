//// [classExtendingPrimitive2.ts]
// classes cannot extend primitives

class C4a extends void {}
class C5a extends null { }

//// [classExtendingPrimitive2.js]
// classes cannot extend primitives
var C4a = (function () {
    function C4a() {
    }
    return C4a;
})();
void {};
var C5a = (function () {
    function C5a() {
    }
    return C5a;
})();
null;
{ }
