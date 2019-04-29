/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////const _break = 0;
////export { _break as break };
////const _implements = 0;
////export { _implements as implements };
////const _unique = 0;
////export { _unique as unique };

// Note: `export const unique = 0;` is legal,
// but we want to test that we don't block an import completion of 'unique' just because it appears in an ExportSpecifier.

// @Filename: /b.ts
////br/*break*/
////im/*implements*/
////un/*unique*/

const preferences: FourSlashInterface.UserPreferences = { includeCompletionsForModuleExports: true };
verify.completions(
    // no reserved words
    {
        marker: "break",
        exact: completion.globals,
        preferences,
    },
    // no strict mode reserved words
    {
        marker: "implements",
        exact: completion.globals,
        preferences,
    },
    // yes contextual keywords
    {
        marker: "unique",
        exact: [
            "globalThis", ...completion.globalsVars, "undefined",
            { name: "unique", source: "/a", sourceDisplay: "./a", text: "(alias) const unique: 0\nexport unique", hasAction: true },
            ...completion.globalKeywords.filter(e => e.name !== "unique"),
        ],
        preferences,
    },
);
