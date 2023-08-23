/// <reference path="fourslash.ts" />

//// function foo1(a: number) {
////     return (b: number) => {
////         return a + b
////     }
//// }
//// foo1(1)(2);

//// function foo2(a: (b: number) => number) {
////     return a(1) + 2
//// }
//// foo2((c: number) => c + 1);

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all",
});
