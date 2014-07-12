var x1 = function foo3<T, U extends { a: T; b: string }>(x: T, z: U) { }
var x2 = function foo3<T, U extends { a: T; b: number }>(x: T, z: U) { }

x1 = x2;
x2 = x1;