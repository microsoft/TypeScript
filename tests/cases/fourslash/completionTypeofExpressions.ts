/// <reference path="fourslash.ts" />

//// const x = "str";
//// function test(arg: typeof x./*1*/) {}
//// function test1(arg: typeof (x./*2*/)) {}

verify.completions({
    marker: "1",
    includes: ['length']
});

verify.completions({
    marker: "2",
    includes: ['length']
});
