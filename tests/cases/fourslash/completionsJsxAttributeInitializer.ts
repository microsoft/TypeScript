/// <reference path="fourslash.ts" />

// @Filename: /a.tsx
////function f(this: { p: number; "a b": number }, x: number): void {
////    <div foo=/**/ />;
////}

verify.completions({
    marker: "",
    includes: [
        { name: "x", text: "(parameter) x: number", kind: "parameter", insertText: "{x}" },
        { name: "p", text: "(JSX attribute) p: number", kind: "JSX attribute", insertText: "{this.p}", sortText: completion.SortText.SuggestedClassMembers, source: completion.CompletionSource.ThisProperty },
        { name: "a b", text: '(JSX attribute) "a b": number', kind: "JSX attribute", insertText: '{this["a b"]}', sortText: completion.SortText.SuggestedClassMembers, source: completion.CompletionSource.ThisProperty },
    ],
    preferences: {
        includeInsertTextCompletions: true,
    },
});
