/// <reference path="fourslash.ts" />
//// enum E {
////     A = "A",
////     B = "B",
//// }
//// declare const e: E
//// switch (e) {
////     case E.B: break;
////     case /*1*/
//// }

verify.completions({
    marker: "1",
    includes: [{
        name: "E.A", insertText: "E.A"
    }],
    excludes: ['E.B'],
    preferences: {
        includeInsertTextCompletions: true
    }
});

