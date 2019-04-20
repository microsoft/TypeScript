/// <reference path="fourslash.ts" />

// @Filename: /a.ts
//// export const parseInt = 0;

// @Filename: /b.ts
////parseI/**/

verify.completions({
  marker: "",
  includes: [{ name: "parseInt", kind: "function", kindModifiers: "declare" }],
  preferences: { includeCompletionsForModuleExports: true },
});
