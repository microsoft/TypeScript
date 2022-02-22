/// <reference path="../fourslash.ts" />

// @Filename: /packages/lib/tsconfig.json
//// {
////     "compilerOptions": {
////         "composite": true,
////         "module": "commonjs",
////         "baseUrl": "./"
////     }
//// }

// @Filename: /packages/lib/foo.ts
//// export const util = 0;

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
//// util/**/

// Ensure referenced project's `baseUrl` doesn't affect module specifier generated

goTo.marker("");

verify.importFixAtPosition(
  [`import { util } from "../lib/foo";\r\n\r\nutil`],
  /*errorCode*/ undefined,
  { includeProjectReferenceAutoImports: "on" });

const expectedData: ts.CompletionEntryData = {
  source: "/packages/lib/tsconfig.json",
  exportName: "util",
  fileName: "/packages/lib/foo.ts",
  moduleSpecifier: "../lib/foo"
};

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "util",
    source: "../lib/foo",
    sourceDisplay: "../lib/foo",
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
  description: `Add import from "../lib/foo"`,
  data: expectedData,
  newFileContent: `import { util } from "../lib/foo";\r\n\r\nutil`,
  preferences: {
    includeProjectReferenceAutoImports: "on"
  },
});
