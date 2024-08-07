/// <reference path="fourslash.ts" />
// @module: commonjs
// @allowJs: true

// @Filename: /file1.js
//// const a = 1;
//// export {
////     a as b
//// };
//// export default a;

// @Filename: /file2.js
//// import * as foo from './file1';
//// /**/
//// export default foo.b;

goTo.marker("");
verify.completions({
    marker: "",
    exact: completion.globalsInJsPlus([
      "foo",
      {
        name: "a",
        source: "./file1",
        sourceDisplay: "./file1",
        hasAction: true,
        sortText: completion.SortText.AutoImportSuggestions
      },
      {
        name: "b",
        source: "./file1",
        sourceDisplay: "./file1",
        hasAction: true,
        sortText: completion.SortText.AutoImportSuggestions
      }
    ]),
    preferences: {
      includeCompletionsForModuleExports: true,
      allowIncompleteCompletions: true,
    },
});