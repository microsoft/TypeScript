/// <reference path="fourslash.ts" />

// @strict: true
//// class C {
////     a = 1
////     b: number = 2
////     c;
////     d;
////
////     constructor(value: number) {
////         this.d = value;
////         if (value <= 0) {
////             this.d = null;
////         }
////     }
//// }

verify.baselineInlayHints(undefined, {
    includeInlayPropertyDeclarationTypeHints: true,
});
