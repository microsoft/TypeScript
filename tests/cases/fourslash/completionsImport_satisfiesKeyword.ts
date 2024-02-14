/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export function satisfies() {}

// @Filename: /b.ts
////1 sat/*a*/
////sat/*2*/

verify.baselineCompletions({
    includeCompletionsForModuleExports: true,
});
