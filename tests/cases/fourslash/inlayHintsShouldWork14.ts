/// <reference path="fourslash.ts" />

//// function foo (a: number, b: number) {}
//// foo(1, 2);

verify.getInlayHints([], undefined, {
    includeInlayParameterNameHints: "none"
});
