/// <reference path='fourslash.ts' />

// @strict: true
//// function test1(arg: { prop: "foo" }) {}
//// test1({ /*1*/prop: "bar" });
////
//// function test2(arg: { prop: "foo" } | undefined) {}
//// test2({ /*2*/prop: "bar" });

verify.quickInfoAt("1", '(property) prop: "foo"');
verify.quickInfoAt("2", '(property) prop: "foo"');