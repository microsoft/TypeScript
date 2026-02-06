/// <reference path="fourslash.ts"/>

// @lib: es5

////class Foo {
////    /** @deprecated m */
////    static m() {}
////}
////Foo./**/

verify.completions({
    marker: "",
    exact: completion.functionMembersPlus([
        {
            name: "prototype",
            sortText: completion.SortText.LocationPriority
        },
        {
            name: "m",
            kind: "method",
            kindModifiers: "static,deprecated",
            sortText: completion.SortText.Deprecated(completion.SortText.LocalDeclarationPriority),
        },
    ])
});
