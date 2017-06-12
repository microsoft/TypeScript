//// [unknownTypeArgOnCall.ts]
class Foo<T> {
  public clone<U>() {
   return null;
   }
}
var f = new Foo<number>();
var r = f.clone<Uhhhh>()


//// [unknownTypeArgOnCall.js]
var Foo = (function () {
    function Foo() {
    }
    var proto_1 = Foo.prototype;
    proto_1.clone = function () {
        return null;
    };
    return Foo;
}());
var f = new Foo();
var r = f.clone();
