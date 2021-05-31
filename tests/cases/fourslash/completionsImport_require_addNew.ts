/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.js
////const x = 0;
////module.exports = { x };

// @Filename: /b.js
////x/**/

verify.completions({
  marker: "",
  includes: {
      name: "x",
      source: "/a",
      sourceDisplay: "./a",
      text: "(alias) const x: 0\nimport x",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
  },
  preferences: { includeCompletionsForModuleExports: true },
});
verify.applyCodeActionFromCompletion("", {
  name: "x",
  source: "/a",
  description: `Import 'x' from module "./a"`,
  newFileContent: `const { x } = require("./a");

x`,
});
