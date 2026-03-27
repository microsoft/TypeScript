/// <reference path="fourslash.ts" />

// @Filename: /a.ts
/////**
//// * @param /**/
//// */
////function foo(z: string, a: number, m: boolean) {}

verify.completions({
    marker: "",
    exact: [
        { name: "z", kind: "parameter", sortText: completion.SortText.LocationPriority + "0" },
        { name: "a", kind: "parameter", sortText: completion.SortText.LocationPriority + "1" },
        { name: "m", kind: "parameter", sortText: completion.SortText.LocationPriority + "2" },
    ],
});
