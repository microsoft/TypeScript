/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {
////   "compilerOptions": {
////     "module": "commonjs"
////   }
//// }

// @Filename: /home/src/workspaces/project/node_modules/@types/node/index.d.ts
//// declare module "fs" {
////   export function accessSync(path: string): void;
//// }

// @Filename: /home/src/workspaces/project/node_modules/@types/fs-extra/index.d.ts
//// export * from "fs";

// @Filename: /home/src/workspaces/project/index.ts
//// access/**/

verify.completions({
  marker: "",
  includes: [{
    name: "accessSync",
    source: "fs",
    sourceDisplay: "fs",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  }, {
    name: "accessSync",
    source: "fs-extra",
    sourceDisplay: "fs-extra",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions
  }],
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true
  }
});

verify.applyCodeActionFromCompletion("", {
  name: "accessSync",
  source: "fs-extra",
  description: `Add import from "fs-extra"`,
  newFileContent: `import { accessSync } from "fs-extra";\r\n\r\naccess`,
  data: {
    exportName: "accessSync",
    fileName: "/home/src/workspaces/project/node_modules/@types/fs-extra/index.d.ts",
    moduleSpecifier: "fs-extra",
  }
});
