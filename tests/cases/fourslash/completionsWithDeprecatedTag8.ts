/// <reference path="fourslash.ts" />

////class C {
////    /** @deprecated */
////    p: number;
////    m() {
////        return (/**/)
////    }
////}

verify.completions({
    marker: "",
    includes: [{
        name: "p",
        kind: "property",
        kindModifiers: "deprecated",
        insertText: "this.p",
        sortText: completion.SortText.Deprecated(completion.SortText.SuggestedClassMembers),
        source: completion.CompletionSource.ThisProperty
    }],
    preferences: {
        includeInsertTextCompletions: true
    },
    isNewIdentifierLocation: true
});
