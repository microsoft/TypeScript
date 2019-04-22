/// <reference path="fourslash.ts" />

// @Filename: /a.ts
//// export const parseInt = 0;

// @Filename: /b.ts
////parseI/**/

verify.completions({
  marker: "",
  // The real parseInt is in 'globalVars', the fake one exported from a.ts is missing
  exact: ["globalThis", ...completion.globalsVars, "undefined", ...completion.statementKeywordsWithTypes],
  preferences: { includeCompletionsForModuleExports: true },
});
