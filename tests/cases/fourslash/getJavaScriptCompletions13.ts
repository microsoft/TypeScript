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

verify.completions(
    { marker: "1", includes: ["file2Identifier1", "file2Identifier2", "file1Identifier"], excludes: "FooProp" },
    { marker: "2", includes: ["file2Identifier1", "file2Identifier2"], excludes: ["file1Identifier", "FooProp"] },
)
