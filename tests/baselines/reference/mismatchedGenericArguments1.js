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
    var proto_1 = C.prototype;
    proto_1.foo = function (x) {
        return null;
    };
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    var proto_2 = C2.prototype;
    proto_2.foo = function (x) {
        return null;
    };
    return C2;
}());
