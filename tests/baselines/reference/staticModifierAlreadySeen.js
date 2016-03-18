//// [staticModifierAlreadySeen.ts]
class C {
    static static foo = 1;
    public static static bar() { }
}

//// [staticModifierAlreadySeen.js]
var C = (function () {
    function C() {
    }
    C.bar = function () { };
    return C;
}());
C.foo = 1;
