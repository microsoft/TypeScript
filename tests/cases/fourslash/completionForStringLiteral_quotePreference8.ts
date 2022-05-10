/// <reference path='fourslash.ts'/>

// @filename: /a.ts
////export const a = null;

// @filename: /b.ts
////import { a } from './a';
////
////const foo = { '"a name\'s all good but it\'s better with more"': null };
////foo[|./**/|]

goTo.file("/b.ts");
verify.completions({
    marker: "",
    exact: [
        { name: "\"a name's all good but it's better with more\"", insertText: "['\"a name\\'s all good but it\\'s better with more\"']", replacementSpan: test.ranges()[0] },
    ],
    preferences: {
        includeInsertTextCompletions: true,
        quotePreference: "auto"
    }
});
