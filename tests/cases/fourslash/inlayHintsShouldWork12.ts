/// <reference path="fourslash.ts" />

//// function foo(a: (b: number) => number) {
////     return a(1) + 2
//// }

//// foo((c: number) => c + 1);

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all",
    interactiveInlayHints: true
});
