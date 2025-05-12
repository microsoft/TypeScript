/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "compilerOptions": { "module": "commonjs", "allowJs": true } }

// @Filename: /home/src/workspaces/project/third_party/marked/src/defaults.js
//// function getDefaults() {
////   return {
////     baseUrl: null,
////   };
//// }
//// 
//// function changeDefaults(newDefaults) {
////   module.exports.defaults = newDefaults;
//// }
//// 
//// module.exports = {
////   defaults: getDefaults(),
////   getDefaults,
////   changeDefaults
//// };

// @Filename: /home/src/workspaces/project/index.ts
//// /**/

format.setOption("newLineCharacter", "\n")
goTo.marker("");

// Create the exportInfoMap
verify.completions({ marker: "", preferences: { includeCompletionsForModuleExports: true } });

// Create a new program and reuse the exportInfoMap from the last request
edit.insert("d");
verify.completions({
  marker: "",
  excludes: ["newDefaults"],
  includes: [{
    name: "defaults",
    source: "/home/src/workspaces/project/third_party/marked/src/defaults",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }],
  preferences: { includeCompletionsForModuleExports: true }
});

verify.applyCodeActionFromCompletion("", {
  name: "defaults",
  source: "/home/src/workspaces/project/third_party/marked/src/defaults",
  description: `Add import from "./third_party/marked/src/defaults"`,
  data: {
    exportName: "defaults",
    fileName: "/home/src/workspaces/project/third_party/marked/src/defaults.js",
  },
  newFileContent: `import { defaults } from "./third_party/marked/src/defaults";

d`
});
