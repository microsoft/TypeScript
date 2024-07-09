/// <reference path="fourslash.ts" />

// @Filename: /tsconfig.json
//// {
////     "compilerOptions": {
////         "module": "esnext",
////         "paths": {
////           "@reduxjs/toolkit": ["src/index.ts"],
////           "@internal/*": ["src/*"]
////         }
////     }
//// }

// @Filename: /src/index.ts
//// export { configureStore } from "./configureStore";

// @Filename: /src/configureStore.ts
//// export function configureStore() {}

// @Filename: /src/tests/createAsyncThunk.typetest.ts
//// import {} from "@reduxjs/toolkit";
//// /**/

verify.completions({
  marker: "",
  includes: [{
    name: "configureStore",
    source: "@reduxjs/toolkit",
    sourceDisplay: "@reduxjs/toolkit",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }],
  preferences: {
    allowIncompleteCompletions: true,
    includeCompletionsForModuleExports: true,
  },
});

verify.applyCodeActionFromCompletion("", {
  name: "configureStore",
  source: "@reduxjs/toolkit",
  data: {
    exportName: "configureStore",
    fileName: "/src/configureStore.ts",
    moduleSpecifier: "@reduxjs/toolkit",
  },
  description: `Update import from "@reduxjs/toolkit"`,
  newFileContent: `import { configureStore } from "@reduxjs/toolkit";\n`,
});
