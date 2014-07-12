class A<T> { foo(x: T) { }}
var foo = new A<number>();
var r: A<string> = <A<number>>new A(); // error
var r2: A<number> = <A<A<number>>>foo; // error