function foo2<T, U extends { y: T; }>(x: U, z: T) { }
foo2({ y: "foo" }, "foo");
 
