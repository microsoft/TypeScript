/// <reference path="fourslash.ts" />

// @module: esnext
// @moduleResolution: bundler

// @Filename: /a.mts
//// export {};

// @Filename: /b.ts
//// export {};

// @Filename: /c.ts
//// export const c = 0;

// @Filename: /main.ts
//// import {} from "./a.mjs";
//// import {} from "./b";
////
//// c/**/;

verify.importFixModuleSpecifiers("", ["./c"]);
