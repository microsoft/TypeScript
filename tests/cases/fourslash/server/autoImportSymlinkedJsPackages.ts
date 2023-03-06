/// <reference path="../fourslash.ts" />

// @Filename: /packages/a/package.json
//// {
////   "name": "package-a",
////   "dependencies": {
////     "package-b": "*"
////   }
//// }

// @Filename: /packages/a/index.js
//// packageB/**/

// @Filename: /packages/b/package.json
//// { "name": "package-b", "main": "index.js" }

// @Filename: /packages/b/index.js
//// export const packageB = "package-b";

// @link: /packages/b -> /packages/a/node_modules/package-b

config.setCompilerOptionsForInferredProjects({ module: "commonjs", allowJs: true, maxNodeModulesJsDepth: 2 });
goTo.marker("");
verify.completions({
  marker: "",
  includes: [{
    name: "packageB",
    source: "package-b",
    sourceDisplay: "package-b",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
  }
});
