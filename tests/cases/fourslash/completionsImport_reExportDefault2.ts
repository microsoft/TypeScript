/// <reference path="fourslash.ts" />

// @module: preserve
// @checkJs: true

// @Filename: /node_modules/example/package.json
//// { "name": "example", "version": "1.0.0", "main": "dist/index.js" }

// @Filename: /node_modules/example/dist/nested/module.d.ts
//// declare const defaultExport: () => void;
//// declare const namedExport: () => void;
//// 
//// export default defaultExport;
//// export { namedExport };

// @Filename: /node_modules/example/dist/index.d.ts
//// export { default, namedExport } from "./nested/module";

// @Filename: /index.mjs
//// import { namedExport } from "example";
//// defaultExp/**/

verify.completions({
    marker: "",
    exact: completion.globalsInJsPlus([
        "namedExport",
        {
            name: "defaultExport",
            source: "example",
            sourceDisplay: "example",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
    ]),
    preferences: {
      includeCompletionsForModuleExports: true,
      allowIncompleteCompletions: true,
    },
});