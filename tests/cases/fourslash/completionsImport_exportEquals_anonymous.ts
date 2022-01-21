/// <reference path='fourslash.ts'/>

// Use `/src` to test that directory names are not included in conversion from module path to identifier.
// @noLib: true

// @Filename: /src/foo-bar.ts
////export = 0;

// @Filename: /src/b.ts
////exp/*0*/
////fooB/*1*/

goTo.marker("0");
const preferences: FourSlashInterface.UserPreferences = { includeCompletionsForModuleExports: true };
const exportEntry: FourSlashInterface.ExpectedCompletionEntryObject = {
    name: "fooBar",
    source: "/src/foo-bar",
    sourceDisplay: "./foo-bar",
    text: "(property) export=: 0",
    kind: "property",
    kindModifiers: "export",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
};
verify.completions(
    {
        marker: "0",
        exact: completion.globalsPlus([], { noLib: true }),
        preferences
    },
    {
        marker: "1",
        exact: completion.globalsPlus([exportEntry], { noLib: true }),
        preferences
    }
);
verify.applyCodeActionFromCompletion("0", {
    name: "fooBar",
    source: "/src/foo-bar",
    description: `Import 'fooBar' from module "./foo-bar"`,
    newFileContent: `import fooBar = require("./foo-bar")

exp
fooB`,
});
