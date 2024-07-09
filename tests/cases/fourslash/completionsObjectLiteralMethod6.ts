/// <reference path="fourslash.ts" />

// @Filename: a.ts
////type T = {
////    foo: () => Promise<void>;
////}
////const foo: T = {
////    async f/**/
////}

verify.completions({
    marker: "",
    includes: [
        {
            name: "foo",
            sortText: completion.SortText.LocationPriority,
        },
    ],
});
