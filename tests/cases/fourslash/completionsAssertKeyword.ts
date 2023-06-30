/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.ts
//// const f = {
////    a: 1
////};
//// import * as thing from "thing" /*0*/
//// export { foo } from "foo" /*1*/
//// import "foo" as /*2*/
//// import "foo" a/*3*/
//// import * as that from "that"
//// /*4*/
//// import * /*5*/ as those from "those"

// @Filename: b.js
//// import * as thing from "thing" /*js*/;

const assertEntry = {
    name: "assert",
    kind: "keyword",
    sortText: completion.SortText.GlobalsOrKeywords,
};

verify.completions(
    {
        marker: "0",
        includes: [assertEntry],
    },
    {
        marker: "1",
        includes: [assertEntry],
    },
    {
        marker: "2",
        excludes: ["assert"],
    },
    {
        marker: "3",
        includes: [assertEntry],
    },
    {
        marker: "4",
        excludes: ["assert"],
    },
    {
        marker: "5",
        excludes: ["assert"],
    },
    {
        marker: "js",
        includes: [assertEntry],
    },
);
