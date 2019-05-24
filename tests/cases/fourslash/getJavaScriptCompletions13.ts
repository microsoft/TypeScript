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
    {
        marker: "1",
        includes: [
            "file2Identifier1",
            "file2Identifier2",
            { name: "file1Identifier", sortText: completion.SortText.GlobalsOrKeywords }
        ],
        excludes: "FooProp"
    },
    {
        marker: "2",
        includes: [
            { name: "file2Identifier1", sortText: completion.SortText.JavascriptIdentifiers },
            { name: "file2Identifier2", sortText: completion.SortText.JavascriptIdentifiers }
        ],
        excludes: ["file1Identifier", "FooProp"]
    },
);
