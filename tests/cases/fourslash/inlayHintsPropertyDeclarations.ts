/// <reference path="fourslash.ts" />

//// class C {
////     a = 1
////     b: number = 2
////     c;
//// }

verify.baselineInlayHints(undefined, {
    includeInlayPropertyDeclarationTypeHints: true,
});
