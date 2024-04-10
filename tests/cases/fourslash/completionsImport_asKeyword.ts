/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function as() {}

// @Filename: /b.ts
////1 a/*1*/
////a/*2*/

verify.baselineCompletions({
    includeCompletionsForModuleExports: true,
});
