//// [mismatchedGenericArguments1.ts]
interface IFoo<T> {
   foo<T>(x: T): T;
}
class C<T> implements IFoo<T> {
   foo(x: string): number {
     return null;
   }
}

class C2<T> implements IFoo<T> {
   foo<U>(x: string): number {
     return null;
   }
}


//// [mismatchedGenericArguments1.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
        return null;
    };
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    C2.prototype.foo = function (x) {
        return null;
    };
    return C2;
}());
