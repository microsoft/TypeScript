// from #42889
/// <reference path="fourslash.ts" />
//// declare function foo(a: number): number;
//// declare function foo(a: string): string;
//// declare function foo/*1*/(a: string | number): string | number;
//// 
//// function foon(a: number): number;
//// function foon(a: string): string;
//// function foon/*2*/(a: string | number): string | number {
////     return a
//// }
//// 
//// foo; foon;
//// 
//// export const bar/*3*/ = 123;
//// console.log({ bar });
//// 
//// interface IFoo {
////     foo/*4*/(): void;
//// }
//// class Foo implements IFoo {
////     foo/*5*/(): void { }
//// }

verify.baselineFindAllReferences('1', '2', '3', '4', '5')
