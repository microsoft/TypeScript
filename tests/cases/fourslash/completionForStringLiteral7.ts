/// <reference path='fourslash.ts'/>

////type T = "foo" | "bar";
////type U = "oof" | "rab";
////function f(x: T, ...args: U[]) { };
////f("/*1*/", "/*2*/", "/*3*/");

verify.completionsAt("1", ["foo", "bar"]);
verify.completionsAt(["2", "3"], ["oof", "rab"]);
