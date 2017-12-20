/// <reference path='fourslash.ts' />

// Should define spans for replacement that appear after the last directory seperator in export statements

// @typeRoots: my_typings

// @Filename: test.ts
//// export * from "./some/*0*/
//// export * from "./sub/some/*1*/";
//// export * from "some-/*2*/";
//// export * from "..//*3*/";
//// export {} from ".//*4*/";


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

goTo.marker("4");
verify.completionListContains("someFile1");
