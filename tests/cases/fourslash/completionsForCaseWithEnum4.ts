/// <reference path="fourslash.ts" />
//// enum E {
////     A = "A",
////     B = "B",
//// }
//// declare const e: E
//// switch (e) {
////     /*1*/
//// }

verify.completions({
    marker: "1",
    includes: [{
        name: "E.A", insertText: "case E.A:"
    }, {
        name: "E.B", insertText: "case E.B:"
    }],
    preferences: {
        includeInsertTextCompletions: true
    }
});

