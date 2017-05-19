/// <reference path="fourslash.ts" />
// @allowNonTsExtensions: true

// @Filename: file1.js

////var file1Identifier = 1;
////interface Foo { FooProp: number };

// @Filename: file2.js

////var file2Identifier1 = 2;
////var file2Identifier2 = 2;
/////*1*/
////file2Identifier2./*2*/

goTo.marker("1");
verify.completionListContains("file2Identifier1");
verify.completionListContains("file2Identifier2");
verify.completionListContains("file1Identifier");
verify.not.completionListContains("FooProp");

goTo.marker("2");
verify.completionListContains("file2Identifier1");
verify.completionListContains("file2Identifier2");
verify.not.completionListContains("file1Identifier")
verify.not.completionListContains("FooProp");