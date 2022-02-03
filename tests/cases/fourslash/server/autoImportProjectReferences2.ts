/// <reference path="../fourslash.ts" />

// @Filename: /packages/lib/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "module": "commonjs"
////     }
//// }

// @Filename: /packages/lib/index.ts
//// export * from "./utils";
//// export const x = 0;

// @Filename: /packages/lib/utils.ts
//// export const util = 1;

// @Filename: /packages/app/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "module": "commonjs"
////     },
////     "references": [
////         { "path": "../lib" }
////     ]
//// }

// @Filename: /packages/app/utils.ts
//// import "../lib";

// @Filename: /packages/app/index.ts
//// util/**/

goTo.marker("");

verify.importFixAtPosition(
  [
    `import { util } from "../lib";\r\n\r\nutil`,
    `import { util } from "../lib/utils";\r\n\r\nutil`
  ],
  /*errorCode*/ undefined,
  { includeProjectReferenceAutoImports: "on" });

const expectedData: ts.CompletionEntryData = {
  source: ts.AutoImportSourceKind.Program,
  exportName: "util",
  fileName: "/packages/lib/index.ts",
  moduleSpecifier: "../lib"
};

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "util",
    source: "../lib",
    sourceDisplay: "../lib",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
    data: expectedData,
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
    includeProjectReferenceAutoImports: "on",
  },
});

verify.applyCodeActionFromCompletion("", {
  name: "util",
  source: "../lib",
  description: `Add import from "../lib"`,
  data: expectedData,
  newFileContent: `import { util } from "../lib";\r\n\r\nutil`,
  preferences: {
    includeProjectReferenceAutoImports: "on"
  },
});
