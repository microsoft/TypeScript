interface Foo<T> {
   x: T;
}
function foo(a) {
   return null;
}
foo((arg: Foo) => { return arg.x; });
