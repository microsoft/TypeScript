//// [tests/cases/compiler/recursiveInheritance3.ts] ////

//// [recursiveInheritance3.ts]
class C implements I {
    public foo(x: any) { return x; }
    private x = 1;
}

interface I extends C {
    other(x: any): any;
}

//// [recursiveInheritance3.js]
var C = /** @class */ (function () {
    function C() {
        this.x = 1;
    }
    C.prototype.foo = function (x) { return x; };
    return C;
}());
