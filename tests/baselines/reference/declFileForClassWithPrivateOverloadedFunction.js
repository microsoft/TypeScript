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
    C.prototype.foo = function (x) { };
    return C;
}());


//// [declFileForClassWithPrivateOverloadedFunction.d.ts]
declare class C {
    private foo(x);
    private foo(x);
}
