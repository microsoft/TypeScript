//// [matchingOfObjectLiteralConstraints.ts]
function foo2<T, U extends { y: T; }>(x: U, z: T) { }
foo2({ y: "foo" }, "foo");
 


//// [matchingOfObjectLiteralConstraints.js]
function foo2(x, z) { }
foo2({ y: "foo" }, "foo");
