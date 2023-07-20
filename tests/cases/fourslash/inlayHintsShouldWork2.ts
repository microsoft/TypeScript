/// <reference path="fourslash.ts" />

//// function foo (a: number, { c }: any) {}
//// foo(1, { c: 1});

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals"
});
