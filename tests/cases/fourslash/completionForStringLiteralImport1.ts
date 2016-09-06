/// <reference path='fourslash.ts' />

// Should define spans for replacement that appear after the last directory seperator in import statements

// @typeRoots: my_typings

// @Filename: test.ts
//// import * as foo0 from  "./[|some|]/*0*/
//// import * as foo1 from  "./sub/[|some|]/*1*/
//// import * as foo2 from  "[|some-|]/*2*/"
//// import * as foo3 from  "../[||]/*3*/";


// @Filename: someFile1.ts
//// /*someFile1*/

// @Filename: sub/someFile2.ts
//// /*someFile2*/

// @Filename: my_typings/some-module/index.d.ts
//// export var x = 9;

goTo.marker("0");
verify.completionListContains("someFile1", undefined, undefined, undefined, 0);

goTo.marker("1");
verify.completionListContains("someFile2", undefined, undefined, undefined, 1);

goTo.marker("2");
verify.completionListContains("some-module", undefined, undefined, undefined, 2);

goTo.marker("3");
verify.completionListContains("fourslash", undefined, undefined, undefined, 3);