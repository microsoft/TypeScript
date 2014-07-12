function foo<T extends { bar: string }>() {
  function bar<S extends T>() {
    var x: S;
    var y: T;
       y = x;
    }
}