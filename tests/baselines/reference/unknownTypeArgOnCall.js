//// [unknownTypeArgOnCall.ts]
class Foo<T> {
  public clone<U>() {
   return null;
   }
}
var f = new Foo<number>();
var r = f.clone<Uhhhh>()


//// [unknownTypeArgOnCall.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.clone = function () {
        return null;
    };
    return Foo;
}());
var f = new Foo();
var r = f.clone();
