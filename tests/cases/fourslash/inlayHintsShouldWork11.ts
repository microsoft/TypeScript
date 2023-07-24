/// <reference path="fourslash.ts" />

//// function foo(a: number) {
////     return (b: number) => {
////         return a + b
////     }
//// }
//// foo(1)(2);

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals",
    interactiveInlayHints: true
});
