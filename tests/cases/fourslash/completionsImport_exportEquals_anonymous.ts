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
const exportEntry: FourSlashInterface.ExpectedCompletionEntryObject = { name: "fooBar", source: "/src/foo-bar", sourceDisplay: "./foo-bar", text: "(property) export=: 0", kind: "property", hasAction: true };
verify.completions(
    { marker: "0", exact: ["globalThis", "undefined", exportEntry, ...completion.statementKeywordsWithTypes], preferences },
    { marker: "1", includes: exportEntry, preferences }
);
verify.applyCodeActionFromCompletion("0", {
    name: "fooBar",
    source: "/src/foo-bar",
    description: `Import 'fooBar' from module "./foo-bar"`,
    newFileContent: `import fooBar = require("./foo-bar");

exp
fooB`,
});
