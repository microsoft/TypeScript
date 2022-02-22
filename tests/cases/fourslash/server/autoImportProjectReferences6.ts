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
////         "module": "commonjs",
////         "rootDir": "src",
////         "outDir": "dist"
////     }
//// }

// @Filename: /packages/lib/src/index.ts
//// export const x = 0;

// @Filename: /packages/lib/dist/index.d.ts
//// export declare const x: number;

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

// @Filename: /packages/app/index.ts
//// x/**/

goTo.marker("");
verify.importFixModuleSpecifiers("", ["../lib/src"], { includeProjectReferenceAutoImports: "on" });

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "x",
    source: "../lib/src",
    sourceDisplay: "../lib/src",
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
  source: "../lib/src",
  description: `Add import from "../lib/src"`,
  data: {
    source: "/packages/lib/tsconfig.json",
    exportName: "x",
    fileName: "/packages/lib/src/index.ts",
  },
  newFileContent: `import { x } from "../lib/src";\r\n\r\nx`,
  preferences: {
    includeProjectReferenceAutoImports: "on"
  }
});
