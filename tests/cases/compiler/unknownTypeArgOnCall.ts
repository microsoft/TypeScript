class Foo<T> {
  public clone<U>() {
   return null;
   }
}
var f = new Foo<number>();
var r = f.clone<Uhhhh>()
