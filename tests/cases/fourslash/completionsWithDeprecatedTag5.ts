/// <reference path="fourslash.ts"/>

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
            sortText: completion.SortText.DeprecatedLocalDeclarationPriority
        },
    ])
});
