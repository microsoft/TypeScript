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

verify.completionListContains("p", "(JSX attribute) p: number", "", "JSX attribute", undefined, undefined, {
    includeInsertTextCompletions: true,
    insertText: "{this.p}",
});

verify.completionListContains("a b", '(JSX attribute) "a b": number', "", "JSX attribute", undefined, undefined, {
    includeInsertTextCompletions: true,
    insertText: '{this["a b"]}',
});
