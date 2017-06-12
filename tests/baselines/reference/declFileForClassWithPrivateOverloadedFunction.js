//// [declFileForClassWithPrivateOverloadedFunction.ts]
class C {
    private foo(x: number);
    private foo(x: string);
    private foo(x: any) { }
}

//// [declFileForClassWithPrivateOverloadedFunction.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (x) { };
    return C;
}());


//// [declFileForClassWithPrivateOverloadedFunction.d.ts]
declare class C {
    private foo(x);
    private foo(x);
}
