interface Foo<T> {
   new (x: number): Foo<T>;
}
var f2: Foo<number> = new Foo(3);
