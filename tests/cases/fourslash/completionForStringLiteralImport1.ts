/// <reference path='fourslash.ts' />

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
verify.importModuleCompletionListContains("someFile1", 0);

goTo.marker("1");
verify.importModuleCompletionListContains("someFile2", 1);

goTo.marker("2");
verify.importModuleCompletionListContains("some-module", 2);

goTo.marker("3");
verify.importModuleCompletionListContains("fourslash", 3);