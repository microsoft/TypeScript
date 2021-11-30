/// <reference path='fourslash.ts'/>

////class Foo {
////    static a() {}
////    static b() {}
////}
////Foo./**/

verify.completions({
    marker: "",
    exact: completion.functionMembersPlus([
        { name: "prototype", sortText: completion.SortText.LocationPriority },
        { name: "a", sortText: completion.SortText.LocalDeclarationPriority },
        { name: "b", sortText: completion.SortText.LocalDeclarationPriority },
    ]),
});
