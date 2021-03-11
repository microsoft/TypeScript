/// <reference path="fourslash.ts" />

/////** @deprecated foo */
////declare function foo<T>();
/////** ok */
////declare function foo<T>(x);
////
////foo/**/

verify.completions({
    marker: "",
    includes: [
      { name: "foo", kind: "function", kindModifiers: "declare" }
    ]
});
