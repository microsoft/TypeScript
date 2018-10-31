/// <reference path='fourslash.ts'/>

////type T = "foo" | "bar";
////type U = "oof" | "rab";
////function f(x: T, ...args: U[]) { };
////f("/*1*/", "/*2*/", "/*3*/");

verify.completions(
    { marker: "1", exact: ["foo", "bar"] },
    { marker: ["2", "3"], exact: ["oof", "rab"] },
);
