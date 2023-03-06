/// <reference path="fourslash.ts"/>

//// const foo = 1;
//// const bar = 2;
//// const obj: any = {
////   foo b/*1*/

verify.completions({
    marker: ["1"],
    exact: completion.globalsPlus(["bar", "foo"]),
});
