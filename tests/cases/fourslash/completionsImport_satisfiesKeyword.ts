/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function satisfies() {}

// @Filename: /b.ts
////1 sat/*1*/
////sat/*2*/

verify.baselineCompletions({
    includeCompletionsForModuleExports: true,
});
