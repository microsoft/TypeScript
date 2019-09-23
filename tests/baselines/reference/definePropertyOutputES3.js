//// [definePropertyOutputES3.ts]
class A {
    a = 12
}


//// [definePropertyOutputES3.js]
var A = /** @class */ (function () {
    function A() {
        Object.defineProperty(this, "a", { value: 12 });
    }
    return A;
}());
