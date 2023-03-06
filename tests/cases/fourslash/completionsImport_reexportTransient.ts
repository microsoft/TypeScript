/// <reference path="fourslash.ts" />

// @esModuleInterop: true

// @Filename: /transient.d.ts
//// declare const map: { [K in "one"]: number };
//// export = map;

// @Filename: /r1.ts
//// export { one } from "./transient";

// @Filename: /r2.ts
//// export { one } from "./r1";

// @Filename: /index.ts
//// one/**/

goTo.marker("");

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "one",
    source: "./transient",
    sourceDisplay: "./transient",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }]),
  preferences: {
    includeCompletionsForModuleExports: true,
    allowIncompleteCompletions: true,
  }
});
