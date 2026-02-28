/// <reference path="fourslash.ts"/>

// @lib: es5

//// const foo = 1;
//// const bar = 2;
//// const obj = {
////   foo b/*1*/

verify.completions({
    marker: ["1"],
    exact: completion.globalsPlus(["bar", "foo"]),
});
