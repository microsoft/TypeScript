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
    C.prototype.foo = function (x) {
    };
    return C;
})();


//// [declFileForClassWithPrivateOverloadedFunction.d.ts]
declare class C {
    private foo(x);
    private foo(x);
}


//// [DtsFileErrors]


tests/cases/compiler/declFileForClassWithPrivateOverloadedFunction.d.ts(2,5): error TS2463: Duplicate overload signature for foo.
tests/cases/compiler/declFileForClassWithPrivateOverloadedFunction.d.ts(3,5): error TS2463: Duplicate overload signature for foo.


==== tests/cases/compiler/declFileForClassWithPrivateOverloadedFunction.d.ts (2 errors) ====
    declare class C {
        private foo(x);
        ~~~~~~~~~~~~~~~
!!! error TS2463: Duplicate overload signature for foo.
        private foo(x);
        ~~~~~~~~~~~~~~~
!!! error TS2463: Duplicate overload signature for foo.
    }
    