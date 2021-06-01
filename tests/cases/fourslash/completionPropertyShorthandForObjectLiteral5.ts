// @module: esnext

// @Filename: /a.ts
//// export const exportedConstant = 0;

// @Filename: /b.ts
//// const foo = 'foo'
//// const obj = { exp/**/

verify.completions({
    marker: "",
    exact: completion.globalsPlus(["foo"]),
    isNewIdentifierLocation: true,
    preferences: { includeCompletionsForModuleExports: true },
});
