/// <reference path="fourslash.ts" />
//// enum E {
////     A,
////     B,
//// }
//// declare const e: E
//// switch (e) {
////     case /*1*/
//// }
//// switch (e) {
////     case /*2*/:
//// }

verify.completions({
    marker: ["1", "2"],
    excludes: ["E.A", "E.B"],
    preferences: {
        includeInsertTextCompletions: false
    }
});
