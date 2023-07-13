/// <reference path="fourslash.ts" />

////function foo(a: unknown, b: unknown, c: unknown) { }
////function bar(...x: [number, number | undefined]) {
////    foo(...x, 3);
////}

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all"
});
