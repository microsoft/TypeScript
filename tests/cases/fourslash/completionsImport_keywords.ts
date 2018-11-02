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
        includes: { name: "break", text: "break", kind: "keyword" },
        excludes: { name: "break", source: "/a" },
        preferences,
    },
    // no strict mode reserved words
    {
        marker: "implements",
        includes: { name: "implements", text: "implements", kind: "keyword" },
        excludes: { name: "implements", source: "/a" },
        preferences,
    },
    // yes contextual keywords
    {
        marker: "unique",
        includes: { name: "unique", source: "/a", sourceDisplay: "./a", text: "(alias) const unique: 0\nexport unique", hasAction: true },
        excludes: { name: "unique", source: undefined },
        preferences,
    },
);
