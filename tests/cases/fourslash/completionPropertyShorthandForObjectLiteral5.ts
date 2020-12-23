// @module: esnext

// @Filename: /a.ts
//// export const exportedConstant = 0;

// @Filename: /b.ts
//// const obj = { exp/**/

verify.completions({
    marker: "",
    preferences: { includeCompletionsForModuleExports: true },
});
