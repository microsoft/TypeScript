//// [tests/cases/compiler/indexIntoArraySubclass.ts] ////

//// [indexIntoArraySubclass.ts]
interface Foo2<T> extends Array<T> { }
declare var x2: Foo2<string>;
var r = x2[0]; // string
r = 0; //error

//// [indexIntoArraySubclass.js]
var r = x2[0]; // string
r = 0; //error
