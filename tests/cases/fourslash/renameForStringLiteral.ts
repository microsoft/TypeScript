/// <reference path="fourslash.ts" />

// @filename: /a.ts
////interface Foo {
////    property: /**/"foo";
////}
/////**
//// * @type {{ property: "foo"}}
//// */
////const obj: Foo = {
////    property: "foo",
////}

verify.baselineRename("", {});
