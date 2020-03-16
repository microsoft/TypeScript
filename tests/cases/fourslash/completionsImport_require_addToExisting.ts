/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.js
////const x = 0;
////function f() {}
////module.exports = { x, f };

// @Filename: /b.js
////const { f } = require("./a");
////
////x/**/

verify.completions({
  marker: "",
  includes: {
      name: "x",
      source: "/a",
      sourceDisplay: "./a",
      text: "(property) x: number",
      hasAction: true,
      sortText: completion.SortText.AutoImportSuggestions
  },
  preferences: { includeCompletionsForModuleExports: true },
});
verify.applyCodeActionFromCompletion("", {
  name: "x",
  source: "/a",
  description: `Add 'x' to existing import declaration from "./a"`,
  newFileContent: `const { f, x } = require("./a");

x`,
});
