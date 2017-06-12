//// [recursiveInheritance3.ts]
class C implements I {
    public foo(x: any) { return x; }
    private x = 1;
}

interface I extends C {
    other(x: any): any;
}

//// [recursiveInheritance3.js]
var C = (function () {
    function C() {
        this.x = 1;
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (x) { return x; };
    return C;
}());
