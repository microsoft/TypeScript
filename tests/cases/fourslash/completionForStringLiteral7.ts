/// <reference path='fourslash.ts'/>

////type T = "foo" | "bar";
////type U = "oof" | "rab";
////function f(x: T, ...args: U[]) { };
////f("/*1*/", "/*2*/", "/*3*/");

// TODO: GH#22907
const options = { isNewIdentifierLocation: true };
verify.completionsAt("1", ["foo", "bar"], options);
verify.completionsAt("2", ["oof", "rab"], options);
verify.completionsAt("3", ["oof", "rab"], options);
