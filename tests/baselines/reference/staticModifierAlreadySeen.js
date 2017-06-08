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
    C.foo = 1;
    return C;
}());
