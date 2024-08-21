/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "compilerOptions": { "module": "commonjs", "lib": ["es2019"] } }

// @Filename: /home/src/workspaces/project/package.json
//// { "dependencies": { "antd": "*", "react": "*" } }

// @Filename: /home/src/workspaces/project/node_modules/@types/react/index.d.ts
//// export declare function Component(): void;

// @Filename: /home/src/workspaces/project/node_modules/antd/index.d.ts
//// import "react";

// @Filename: /home/src/workspaces/project/index.ts
//// Component/**/

// react/index.d.ts will be in both the auto import provider program
// and the main program, and will result in duplicate completions
// unless the two programs successfully share the same source file.
// This tests the configuration of the AutoImportProviderProject.
// See also the 'Can use the same document registry bucket key as main program'
// unit test in autoImportProvider.ts.
goTo.marker("");
verify.completions({
  marker: "",
  includes: [{
    name: "Component",
    hasAction: true,
    source: "/home/src/workspaces/project/node_modules/@types/react/index",
    sortText: completion.SortText.AutoImportSuggestions,
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
  },
});
