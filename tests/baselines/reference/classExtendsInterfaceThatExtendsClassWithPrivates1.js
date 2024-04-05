//// [tests/cases/compiler/classExtendsInterfaceThatExtendsClassWithPrivates1.ts] ////

//// [classExtendsInterfaceThatExtendsClassWithPrivates1.ts]
class C {
    public foo(x: any) { return x; }
    private x = 1;
}

interface I extends C {
    other(x: any): any;
}

class D2 implements I {
    public foo(x: any) { return x }
    private x = 3;
    other(x: any) { return x }
} 

//// [classExtendsInterfaceThatExtendsClassWithPrivates1.js]
var C = /** @class */ (function () {
    function C() {
        this.x = 1;
    }
    C.prototype.foo = function (x) { return x; };
    return C;
}());
var D2 = /** @class */ (function () {
    function D2() {
        this.x = 3;
    }
    D2.prototype.foo = function (x) { return x; };
    D2.prototype.other = function (x) { return x; };
    return D2;
}());
