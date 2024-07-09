/// <reference path="fourslash.ts" />

// @strict: true

////interface I {
////    /** @deprecated a */
////    a: number;
////}

////const foo = {
////    a: 1
////}

////const i: I = {
////    ...foo,
////    /**/
////}

verify.completions({
    marker: "",
    exact: [{
        name: "a",
        sortText: completion.SortText.Deprecated(completion.SortText.MemberDeclaredBySpreadAssignment),
        kind: 'property',
        kindModifiers: "deprecated"
    }]
});
