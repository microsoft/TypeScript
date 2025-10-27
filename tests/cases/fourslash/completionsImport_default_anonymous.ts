/// <reference path="fourslash.ts" />

// Use `/src` to test that directory names are not included in conversion from module path to identifier.
// @module: esnext
// @noLib: true

// @Filename: /src/foo-bar.ts
////export default 0;

// @Filename: /src/b.ts
////def/*0*/
////fooB/*1*/

goTo.marker("0");
const preferences: FourSlashInterface.UserPreferences = { includeCompletionsForModuleExports: true };
verify.completions(
    {
        marker: "0",
        exact: completion.globalsPlus([], { noLib: true }),
        preferences
    },
    {
        marker: "1",
        includes: {
            name: "fooBar",
            source: "/src/foo-bar",
            sourceDisplay: "./foo-bar",
            text: "(property) default: 0",
            kind: "property",
            kindModifiers: "export",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
        preferences,
    },
);
verify.applyCodeActionFromCompletion("1", {
    name: "fooBar",
    source: "/src/foo-bar",
    description: `Add import from "./foo-bar"`,
    newFileContent: `import fooBar from "./foo-bar"

def
fooB`,
});
