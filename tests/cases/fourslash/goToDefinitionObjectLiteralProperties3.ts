/// <reference path='fourslash.ts'/>

//// type A = {
////   foo: unknown;
//// };
////
//// type B = {
////   foo?: unknown;
////   bar: unknown;
//// };
////
//// function test1(arg: A | B) {}
////
//// test1({
////   foo/*1*/: 1,
//// });
////
//// function test2<T extends A>(arg: T | B) {}
////
//// test2({
////   foo/*2*/: 2,
//// });

verify.baselineGoToDefinition("1", "2");
