//// [tests/cases/compiler/primitiveConstraints1.ts] ////

//// [primitiveConstraints1.ts]
function foo1<T extends U, U>(t: T, u: U) { }
foo1<string, number>('hm', 1); // no error
 
function foo2<T, U extends T>(t: T, u: U) { }
foo2<number, string>(1, 'hm'); // error


//// [primitiveConstraints1.js]
function foo1(t, u) { }
foo1('hm', 1); // no error
function foo2(t, u) { }
foo2(1, 'hm'); // error
