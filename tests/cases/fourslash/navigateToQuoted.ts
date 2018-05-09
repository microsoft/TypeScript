/// <reference path="fourslash.ts" />

// @noLib: true

////class C {
////    ["foo-bar"]() {}
////    ["foo bar"]() {}
////}

verify.navigationItemsListContains("foo-bar", "method", "foo-bar", "exact", undefined, "C");
// TODO: GH#23035
// verify.navigationItemsListContains("foo bar", "method", "foo bar", "exact", undefined, "C");
