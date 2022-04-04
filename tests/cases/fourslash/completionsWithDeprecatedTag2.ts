/// <reference path="fourslash.ts" />

/////** @deprecated foo */
////declare function foo<T>();
/////** @deprecated foo<T> */
////declare function foo<T>(x);
////
////foo/**/

verify.completions({
    marker: "",
    includes: [{
        name: "foo",
        kind: "function",
        kindModifiers: "deprecated,declare",
        sortText: completion.SortText.Deprecated(completion.SortText.LocationPriority),
    }]
});
