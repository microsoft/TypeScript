/// <reference path="fourslash.ts" />

//// function foo (v: any) {}

//// foo(1);
//// foo('');
//// foo(true);

//// foo(foo);
//// foo((1));
//// foo(foo(1));

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals",
    interactiveInlayHints: true
});
