/// <reference path="fourslash.ts" />

////const foo = (a = 1) => class { }
////
////const C1 = class extends foo(1) { }
////class C2 extends foo(1) { }

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals",
    interactiveInlayHints: true
});
