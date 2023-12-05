/// <reference path="fourslash.ts" />

//// function foo (a: number, b: number) {}
//// declare const a: 1;
//// foo(a, 2);
//// declare const v: any;
//// foo(v.a, v.a);
//// foo(v.b, v.b);
//// foo(v.c, v.c);

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "all",
    includeInlayParameterNameHintsWhenArgumentMatchesName: false,
});
