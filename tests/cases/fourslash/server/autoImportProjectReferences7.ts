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
////         "module": "commonjs",
////         "disableSourceOfProjectReferenceRedirect": true
////     },
////     "references": [
////         { "path": "../lib" }
////     ]
//// }

// @Filename: /packages/app/other.ts
//// import "../lib/dist";

// @Filename: /packages/app/index.ts
//// x/**/

goTo.marker("");
verify.importFixModuleSpecifiers("", ["../lib/dist"], { includeProjectReferenceAutoImports: "on" });

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "x",
    source: "../lib/dist",
    sourceDisplay: "../lib/dist",
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
  source: "../lib/dist",
  description: `Add import from "../lib/dist"`,
  data: {
    source: ts.AutoImportSourceKind.Program,
    exportName: "x",
    fileName: "/packages/lib/dist/index.d.ts",
  },
  newFileContent: `import { x } from "../lib/dist";\r\n\r\nx`,
  preferences: {
    includeProjectReferenceAutoImports: "on"
  }
});
