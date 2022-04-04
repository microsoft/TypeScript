/// <reference path="fourslash.ts" />

// @noLib: true

////f({
////    a/**/
////    xyz: ``,
////});
////declare function f(options: {
////    /** @deprecated abc */
////    abc?: number,
////    xyz?: string
////}): void;

verify.completions({
    marker: "",
    exact: [{
        name: "abc",
        kind: "property",
        kindModifiers: "deprecated,declare,optional",
        sortText: completion.SortText.Deprecated(completion.SortText.OptionalMember),
    }],
});
