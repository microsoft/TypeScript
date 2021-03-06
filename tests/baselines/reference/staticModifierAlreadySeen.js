//// [staticModifierAlreadySeen.ts]
class C {
    static static foo = 1;
    public static static bar() { }
}

//// [staticModifierAlreadySeen.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.bar = function () { };
    (function () {
        C.foo = 1;
    }).call(C);
    return C;
}());
