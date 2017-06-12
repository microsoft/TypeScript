//// [methodSignatureDeclarationEmit1.ts]
class C {
  public foo(n: number): void;
  public foo(s: string): void;
  public foo(a: any): void {
  }
}

//// [methodSignatureDeclarationEmit1.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function (a) {
    };
    return C;
}());


//// [methodSignatureDeclarationEmit1.d.ts]
declare class C {
    foo(n: number): void;
    foo(s: string): void;
}
