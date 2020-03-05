/// <reference path='fourslash.ts'/>

////const a = {
////    '#': 'a'
////};
////a[|./**/|]

verify.completions({
    marker: "",
    includes: [
        { name: "#", insertText: "['#']", replacementSpan: test.ranges()[0] },
    ],
    preferences: {
        includeInsertTextCompletions: true,
        quotePreference: "single",
    },
});
