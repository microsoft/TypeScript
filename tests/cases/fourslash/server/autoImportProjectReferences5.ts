/// <reference path="../fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////     "files": [],
////     "references": [
////         { "path": "packages/lib" },
////         { "path": "packages/app" }
////     ]
//// }

// @Filename: /packages/lib/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "module": "commonjs"
////     }
//// }

// @Filename: /packages/lib/index.ts
//// export const x = 0;

// @Filename: /packages/app/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "module": "commonjs",
////         "paths": {
////             "lib": ["../lib/index.ts"],
////             "lib/*": ["../lib/*"]
////         }
////     },
////     "references": [
////         { "path": "../lib" }
////     ]
//// }

// @Filename: /packages/app/index.ts
//// x/**/

goTo.marker("");
verify.importFixModuleSpecifiers("", ["lib"], { includeProjectReferenceAutoImports: "on" });

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "x",
    source: "lib",
    sourceDisplay: "lib",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
    includeProjectReferenceAutoImports: "on",
  },
});

verify.applyCodeActionFromCompletion("", {
  name: "x",
  source: "lib",
  description: `Add import from "lib"`,
  data: {
    source: "/packages/lib/tsconfig.json",
    exportName: "x",
    fileName: "/packages/lib/index.ts",
  },
  newFileContent: `import { x } from "lib";\r\n\r\nx`,
  preferences: {
    includeProjectReferenceAutoImports: "on"
  }
});
