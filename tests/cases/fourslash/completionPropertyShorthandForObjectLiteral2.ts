/// <reference path="fourslash.ts"/>

//// const foo = 1;
//// const bar = 2;

//// const obj1 = {
////   foo b/*1*/
//// };

//// const obj2: any = {
////   foo b/*2*/
//// };

verify.completions({
    marker: ["1"],
    exact: completion.globalsPlus(["bar", "foo", "obj2"]),
});

verify.completions({
    marker: ["2"],
    exact: completion.globalsPlus(["bar", "foo", "obj1"]),
});
