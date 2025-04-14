//// [tests/cases/conformance/classes/propertyMemberDeclarations/thisInInstanceMemberInitializer.ts] ////

//// [thisInInstanceMemberInitializer.ts]
class C {
    x = this;
}

class D<T> {
    x = this;
    y: T;
}

//// [thisInInstanceMemberInitializer.js]
var C = /** @class */ (function () {
    function C() {
        this.x = this;
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
        this.x = this;
    }
    return D;
}());
