//// [tests/cases/compiler/declFileForClassWithPrivateOverloadedFunction.ts] ////

//// [declFileForClassWithPrivateOverloadedFunction.ts]
class C {
    private foo(x: number);
    private foo(x: string);
    private foo(x: any) { }
}

//// [declFileForClassWithPrivateOverloadedFunction.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (x) { };
    return C;
}());


//// [declFileForClassWithPrivateOverloadedFunction.d.ts]
declare class C {
    private foo;
}
