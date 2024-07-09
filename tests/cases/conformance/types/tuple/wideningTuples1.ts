//@noImplicitAny: true
declare function foo<T extends [any]>(x: T): T;

var y = foo([undefined]);
y = [""];