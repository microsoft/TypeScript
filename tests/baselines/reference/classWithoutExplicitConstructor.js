//// [tests/cases/conformance/classes/constructorDeclarations/automaticConstructors/classWithoutExplicitConstructor.ts] ////

//// [classWithoutExplicitConstructor.ts]
class C {
    x = 1
    y = 'hello';
}

var c = new C();
var c2 = new C(null); // error

class D<T extends Date> {
    x = 2
    y: T = null;
}

var d = new D();
var d2 = new D(null); // error

//// [classWithoutExplicitConstructor.js]
var C = /** @class */ (function () {
    function C() {
        this.x = 1;
        this.y = 'hello';
    }
    return C;
}());
var c = new C();
var c2 = new C(null); // error
var D = /** @class */ (function () {
    function D() {
        this.x = 2;
        this.y = null;
    }
    return D;
}());
var d = new D();
var d2 = new D(null); // error
