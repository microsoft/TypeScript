/// <reference path="fourslash.ts" />

// @module: commonjs

// @Filename: /node_modules/antd/index.d.ts
//// declare function Table(): void;
//// export default Table;

// @Filename: /node_modules/rc-table/index.d.ts
//// declare function Table(): void;
//// export default Table;

// @Filename: /index.ts
//// Table/**/

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "Table",
    source: "antd",
    sourceDisplay: "antd",
    sortText: completion.SortText.AutoImportSuggestions,
    hasAction: true,
  }, {
    name: "Table",
    source: "rc-table",
    sourceDisplay: "rc-table",
    sortText: completion.SortText.AutoImportSuggestions,
    hasAction: true,
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
  }
});
