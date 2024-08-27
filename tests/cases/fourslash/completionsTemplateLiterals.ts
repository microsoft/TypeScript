/// <reference path="fourslash.ts" />

////type T = `${"prefix1"|"prefix2"}${string}`;
////let x: T = "pr/*1*/;

////function f(x:`${"prefix1"|"prefix2"}${string}`);
////f("pr/*2*/");


verify.completions({
    marker: "1",
    unsorted: ["prefix1", "prefix2"]
});
verify.completions({
    marker: "2",
    unsorted: ["prefix1", "prefix2"]
});
