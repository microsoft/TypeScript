//// [primitiveConstraints2.ts]
class C<T> {
   public bar2<U extends T>(x: T, y: U): T {
      return null;
     }
}
 
var x = new C<number>();
x.bar2(2, ""); // should error
x.bar2<string>(2, ""); // should error

//// [primitiveConstraints2.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.bar2 = function (x, y) {
        return null;
    };
    return C;
}());
var x = new C();
x.bar2(2, ""); // should error
x.bar2(2, ""); // should error
