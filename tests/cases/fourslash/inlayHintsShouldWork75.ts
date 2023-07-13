/// <reference path="fourslash.ts" />

////function foo(a: unknown, b: unknown, c: unknown) { }
////function bar(...x: []) {
////    foo(...x, 1, 2, 3);
////}

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all"
});
