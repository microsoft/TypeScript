/// <reference path='fourslash.ts' />

// Should define spans for replacement that appear after the last directory seperator in triple slash references

// @typeRoots: my_typings

// @Filename: test.ts
//// /// <reference path="./[|some|]/*0*/
//// /// <reference types="[|some|]/*1*/

//// /// <reference path="./sub/[|some|]/*2*/" />
//// /// <reference types="[|some|]/*3*/" />

// @Filename: someFile.ts
//// /*someFile*/

// @Filename: sub/someOtherFile.ts
//// /*someOtherFile*/

// @Filename: my_typings/some-module/index.d.ts
//// export var x = 9;

goTo.marker("0");
verify.completionListContains("someFile.ts", undefined, undefined, undefined, 0);

goTo.marker("1");
verify.completionListContains("some-module", undefined, undefined, undefined, 1);

goTo.marker("2");
verify.completionListContains("someOtherFile.ts", undefined, undefined, undefined, 2);

goTo.marker("3");
verify.completionListContains("some-module", undefined, undefined, undefined, 3);