/// <reference path="fourslash.ts" />

////class C {
////    "foo bar": number;
////    xyz() {
////        return (/**/)
////    }
////}
////
////function f(this: { x: number }) { /*f*/ }

const preferences: FourSlashInterface.UserPreferences = { includeInsertTextCompletions: true };
verify.completions(
    {
        marker: "",
        includes: [
            { name: "xyz", text: "(method) C.xyz(): any", kind: "method", insertText: "this.xyz", sortText: completion.SortText.SuggestedClassMembers, source: completion.CompletionSource.ThisProperty },
            { name: "foo bar", text: '(property) C["foo bar"]: number', kind: "property", insertText: 'this["foo bar"]', sortText: completion.SortText.SuggestedClassMembers, source: completion.CompletionSource.ThisProperty },
        ],
        isNewIdentifierLocation: true,
        preferences,
    },
    {
        marker: "f",
        includes: { name: "x", text: "(property) x: number", kind: "property", insertText: "this.x", sortText: completion.SortText.SuggestedClassMembers, source: completion.CompletionSource.ThisProperty },
        preferences,
    },
);
