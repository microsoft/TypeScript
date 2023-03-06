/// <reference path="fourslash.ts" />

// @Filename: /a.tsx
////function f(this: { p: number; "a b": number }, x: number): void {
////    <div foo=/**/ />;
////}

verify.completions({
    marker: "",
    includes: [
        { name: "x", text: "(parameter) x: number", kind: "parameter", insertText: "{x}" },
        { name: "p", text: "(property) p: number", kind: "property", insertText: "{this.p}", sortText: completion.SortText.SuggestedClassMembers, source: completion.CompletionSource.ThisProperty },
        { name: "a b", text: '(property) "a b": number', kind: "property", insertText: '{this["a b"]}', sortText: completion.SortText.SuggestedClassMembers, source: completion.CompletionSource.ThisProperty },
    ],
    preferences: {
        includeInsertTextCompletions: true,
    },
});
