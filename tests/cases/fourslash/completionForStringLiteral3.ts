/// <reference path='fourslash.ts'/>

////declare function f(a: "A", b: number): void;
////declare function f(a: "B", b: number): void;
////declare function f(a: "C", b: number): void;
////declare function f(a: string, b: number): void;
////
////f("/*1*/C", 2);
////
////f("/*2*/

verify.completionsAt(["1", "2"], ["A", "B", "C"], { isNewIdentifierLocation: true });
