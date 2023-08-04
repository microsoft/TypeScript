/// <reference path="fourslash.ts" />

////function foo({ a, b }: { a: unknown, b: unknown }, c: unknown, d: unknown) { }
////function bar(...x: [{ a: unknown, b: unknown }, number]) {
////    foo(...x, 1);
////}

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all"
});
