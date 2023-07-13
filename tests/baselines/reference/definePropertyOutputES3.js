//// [tests/cases/conformance/classes/propertyMemberDeclarations/definePropertyOutputES3.ts] ////

//// [definePropertyOutputES3.ts]
class A {
    a = 12
}


//// [definePropertyOutputES3.js]
var A = /** @class */ (function () {
    function A() {
        Object.defineProperty(this, "a", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 12
        });
    }
    return A;
}());
