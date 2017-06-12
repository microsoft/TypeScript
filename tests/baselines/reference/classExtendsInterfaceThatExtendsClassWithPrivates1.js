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
var C = (function () {
    function C() {
        this.x = 1;
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (x) { return x; };
    return C;
}());
var D2 = (function () {
    function D2() {
        this.x = 3;
    }
    var proto_2 = D2.prototype;
    proto_2.foo = function (x) { return x; };
    proto_2.other = function (x) { return x; };
    return D2;
}());
