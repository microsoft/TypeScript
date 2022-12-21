//// [staticModifierAlreadySeen.ts]
class C {
    static static foo = 1;
    public static static bar() { }
}

//// [staticModifierAlreadySeen.js]
var C = /** @class */ (function () {
    function C() {
        this.foo = 1;
    }
    C.prototype.bar = function () { };
    return C;
}());
