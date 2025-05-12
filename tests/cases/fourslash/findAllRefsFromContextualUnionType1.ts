/// <reference path='fourslash.ts' />

// @strict: true
//// function test1(arg: { prop: "foo" }) {}
//// test1({ /*1*/prop: "bar" });
////
//// function test2(arg: { prop: "foo" } | undefined) {}
//// test2({ /*2*/prop: "bar" });

verify.baselineFindAllReferences("1", "2");