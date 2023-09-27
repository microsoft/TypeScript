/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.ts
//// const f = {
////    a: 1
////};
//// import * as thing from "thing" /*0*/
//// export { foo } from "foo" /*1*/
//// import "foo" as /*2*/
//// import "foo" w/*3*/
//// import * as that from "that"
//// /*4*/
//// import * /*5*/ as those from "those"

// @Filename: b.js
//// import * as thing from "thing" /*js*/;

verify.baselineCompletions();
