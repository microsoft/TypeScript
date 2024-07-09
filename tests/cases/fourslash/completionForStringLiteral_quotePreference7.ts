/// <reference path='fourslash.ts'/>

// @filename: /a.ts
////export const a = null;

// @filename: /b.ts
////import { a } from './a';
////
////const foo = { '#': null };
////foo[|./**/|]

goTo.file("/b.ts");
verify.completions({
    marker: "",
    exact: [
        { name: "#", insertText: "['#']", replacementSpan: test.ranges()[0] },
    ],
    preferences: {
        includeInsertTextCompletions: true,
        quotePreference: "auto"
    }
});
