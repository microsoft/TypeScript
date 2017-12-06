/// <reference path='fourslash.ts' />

// Should define spans for replacement that appear after the last directory seperator in dynamic import statements

// @typeRoots: my_typings

// @Filename: test.ts
//// const a = import("./some/*0*/
//// const a = import("./sub/some/*1*/");
//// const a = import("some-/*2*/");
//// const a = import("..//*3*/");


// @Filename: someFile1.ts
//// /*someFile1*/

// @Filename: sub/someFile2.ts
//// /*someFile2*/

// @Filename: my_typings/some-module/index.d.ts
//// export var x = 9;

goTo.marker("0");
verify.completionListContains("someFile1");

goTo.marker("1");
verify.completionListContains("someFile2");

goTo.marker("2");
verify.completionListContains("some-module");

goTo.marker("3");
verify.completionListContains("fourslash");
