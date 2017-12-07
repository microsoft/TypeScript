/// <reference path="fourslash.ts" />

////interface Hook {
////    tap(): void
////}
////
////declare class SyncHook implements Hook {[| |]}

verify.rangeAfterCodeFix(`
tap(): void;
`);
