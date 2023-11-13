/// <reference path="fourslash.ts" />

// @lib: esnext
// @filename: /main.ts
//// class C {
////   static /*end*/[Symbol.hasInstance](value: unknown): boolean { return true; }
//// }
//// declare var obj: any;
//// obj [|/*start*/instanceof|] C;

verify.baselineGoToDefinition("start");
