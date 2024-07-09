/// <reference path="fourslash.ts"/>

////module Foo {
////    /** @deprecated foo */
////    export var foo: number;
////}
////Foo./**/

verify.completions({
    marker: "",
    exact: [{
        name: "foo",
        kind: "var",
        kindModifiers: "export,deprecated",
        sortText: completion.SortText.Deprecated(completion.SortText.LocationPriority),
    }]
});
