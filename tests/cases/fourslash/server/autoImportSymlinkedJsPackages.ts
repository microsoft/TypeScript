/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/packages/a/package.json
//// {
////   "name": "package-a",
////   "dependencies": {
////     "package-b": "*"
////   }
//// }

// @Filename: /home/src/workspaces/project/packages/a/index.js
//// packageB/**/

// @Filename: /home/src/workspaces/project/packages/b/package.json
//// { "name": "package-b", "main": "index.js" }

// @Filename: /home/src/workspaces/project/packages/b/index.js
//// export const packageB = "package-b";

// @link: /home/src/workspaces/project/packages/b -> /home/src/workspaces/project/packages/a/node_modules/package-b

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
