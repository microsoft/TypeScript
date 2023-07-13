/// <reference path="fourslash.ts" />

//// function foo (Im_very_very_very_very_very_very_very_long: number) {}
//// foo(1);

verify.baselineInlayHints(undefined, {
    includeInlayParameterNameHints: "literals"
});
