/// <reference path="fourslash.ts" />

////interface Hook {
////    tap(): void;
////    tap(x: number): string;
////}
////
////declare class SyncHook implements Hook {[| |]

verify.rangeAfterCodeFix(`
tap(): void;
tap(x: number): string;
`);