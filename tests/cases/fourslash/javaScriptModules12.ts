///<reference path="fourslash.ts" />

// Invocations of 'require' stop top-level variables from becoming global

// @allowJs: true

// @Filename: mod1.js
//// var x = require('fs');
//// /*1*/

// @Filename: mod2.js
//// var y;
//// if(true) {
////     y = require('fs');
//// }
//// /*2*/

// @Filename: glob1.js
//// var a = require;
//// /*3*/

// @Filename: glob2.js
//// var b = '';
//// /*4*/

// @Filename: consumer.js
//// /*5*/

verify.completions(
    {
        marker: "1",
        includes: [
            "x",
            { name: "a", sortText: completion.SortText.GlobalsOrKeywords },
            { name: "b", sortText: completion.SortText.GlobalsOrKeywords }
        ], excludes: "y"
    },
    {
        marker: "2",
        includes: [
            "y",
            { name: "a", sortText: completion.SortText.GlobalsOrKeywords },
            { name: "b", sortText: completion.SortText.GlobalsOrKeywords }
        ],
        excludes: "x"
    },
    {
        marker: "3",
        includes: [
            "a",
            { name: "b", sortText: completion.SortText.GlobalsOrKeywords }
        ],
        excludes: ["x", "y"]
    },
    {
        marker: "4",
        includes: [
            { name: "a", sortText: completion.SortText.GlobalsOrKeywords },
            "b"
        ],
        excludes: ["x", "y"]
    },
    {
        marker: ["5"],
        includes: [
            { name: "a", sortText: completion.SortText.GlobalsOrKeywords },
            { name: "b", sortText: completion.SortText.GlobalsOrKeywords }
        ],
        excludes: ["x", "y"]
    },
);
