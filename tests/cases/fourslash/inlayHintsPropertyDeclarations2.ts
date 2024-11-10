/// <reference path="fourslash.ts" />

// @strict: true
// @target: esnext
//// class C {
////     accessor a = 1
////     accessor b: number = 2
////     accessor c;
////     accessor d;
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
