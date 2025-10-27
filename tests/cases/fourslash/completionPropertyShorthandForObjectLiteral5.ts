// @module: esnext

// @Filename: /a.ts
//// export const exportedConstant = 0;

// @Filename: /b.ts
//// const foo = 'foo'
//// const obj = { exp/**/

verify.completions({
    marker: "",
    includes: { name: "exportedConstant", source: "/a", hasAction: true, sortText: completion.SortText.AutoImportSuggestions }, 
    isNewIdentifierLocation: true,
    preferences: { includeCompletionsForModuleExports: true },
});
