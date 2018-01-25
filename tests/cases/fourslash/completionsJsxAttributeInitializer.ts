/// <reference path="fourslash.ts" />

// @Filename: /a.tsx
////function f(this: { p: number; "a b": number }, x: number): void {
////    <div foo=/**/ />;
////}

goTo.marker();

verify.completionListContains("x", "(parameter) x: number", "", "parameter", undefined, undefined, {
    includeInsertTextCompletions: true,
    insertText: "{x}",
});

verify.completionListContains("p", "(property) p: number", "", "property", undefined, undefined, {
    includeInsertTextCompletions: true,
    insertText: "{this.p}",
});

verify.completionListContains("a b", '(property) "a b": number', "", "property", undefined, undefined, {
    includeInsertTextCompletions: true,
    insertText: '{this["a b"]}',
});
