//// [tests/cases/compiler/unknownTypeArgOnCall.ts] ////

//// [unknownTypeArgOnCall.ts]
class Foo<T> {
  public clone<U>() {
   return null;
   }
}
var f = new Foo<number>();
var r = f.clone<Uhhhh>()


//// [unknownTypeArgOnCall.js]
class Foo {
    clone() {
        return null;
    }
}
var f = new Foo();
var r = f.clone();
