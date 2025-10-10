/// <reference path='fourslash.ts'/>

//// type C = {
////   foo: string;
////   bar: number;
//// };
////
//// declare function fn<T extends C>(arg: T): T;
////
//// fn({
////   foo/*1*/: "",
////   bar/*2*/: true,
//// });
////
//// const result = fn({
////   foo/*3*/: "",
////   bar/*4*/: 1,
//// });
////
//// // this one shouldn't go to the constraint type
//// result.foo/*5*/;

verify.baselineGoToDefinition("1", "2", "3", "4", "5");
