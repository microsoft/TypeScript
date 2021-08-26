/// <reference path="fourslash.ts" />

////enum E {
////	v
////}
////const enum ES {
////	v = "str"
////}
////const e: E = /*a*/;
////const es: ES = /*b*/;


verify.completions({
    marker: "a",
    isNewIdentifierLocation: true,
    excludes: ["0"],
    includes: [
        {
            name: "E",
            isRecommended: true,
            sortText: completion.SortText.LocationPriority,
        }
    ],
}, {
    marker: "b",
    isNewIdentifierLocation: true,
    excludes: ["str"],
    includes: [
        {
            name: "ES",
            isRecommended: true,
            sortText: completion.SortText.LocationPriority,
        }
    ],
});
