/// <reference path="../fourslash.ts" />

// @Filename: /packages/lib/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "module": "commonjs",
////         "outDir": "./dist",
////         "rootDir": "./src"
////     }
//// }

// @Filename: /packages/lib/package.json
//// {
////     "name": "lib",
////     "version": "1.0.0",
////     "main": "dist/index.js",
////     "types": "dist/index.d.ts"
//// }

// @Filename: /packages/lib/dist/index.js
//// module.exports.util = 0;

// @Filename: /packages/lib/dist/index.d.ts
//// export const util: number;

// @Filename: /packages/lib/src/index.ts
//// export const util = 0;

// @link: /packages/lib -> /node_modules/lib

// @Filename: /node_modules/make-me-discover-a-symlink/package.json
//// { "name": "make-me-discover-a-symlink", "version": "1.0.0" }

// @Filename: /node_modules/make-me-discover-a-symlink/index.d.ts
//// /// <reference types="lib" />

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

// @Filename: /packages/app/package.json
//// { "dependencies": { "make-me-discover-a-symlink": "*" } }

// @Filename: /packages/app/index.ts
//// util/**/

// Test that the ModuleSpecifierResolutionHost used for resolving the specifier
// for a file in the referenced project knows that lib/src/index.ts is a source
// of a project reference redirect.

goTo.marker("");

verify.importFixAtPosition(
  [`import { util } from "lib";\r\n\r\nutil`],
  /*errorCode*/ undefined);

const expectedData: ts.CompletionEntryData = {
  source: ts.AutoImportSourceKind.PackageJson,
  exportName: "util",
  fileName: "/packages/lib/src/index.ts",
  moduleSpecifier: "lib"
};

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "util",
    source: "lib",
    sourceDisplay: "lib",
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
  description: `Add import from "lib"`,
  data: expectedData,
  newFileContent: `import { util } from "lib";\r\n\r\nutil`,
  preferences: {
    includeProjectReferenceAutoImports: "on"
  },
});
