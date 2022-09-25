/// <reference path="fourslash.ts" />

// @Filename: /lib/components/button/Button.ts
//// export function Button() {}

// @Filename: /lib/components/button/index.ts
//// export * from "./Button";

// @Filename: /lib/components/index.ts
//// export * from "./button";

// @Filename: /lib/main.ts
//// export { Button } from "./components";

// @Filename: /lib/index.ts
//// export * from "./main";

// @Filename: /i-hate-index-files.ts
//// Button/**/

verify.completions({
  marker: "",
  exact: completion.globalsPlus([{
    name: "Button",
    source: "./lib/main",
    sourceDisplay: "./lib/main",
    hasAction: true,
    sortText: completion.SortText.AutoImportSuggestions,
  }]),
  preferences: {
    allowIncompleteCompletions: true,
    includeCompletionsForModuleExports: true,
    autoImportFileExcludePatterns: ["/**/index.*"],
  },
});

verify.importFixModuleSpecifiers("",
  ["./lib/main", "./lib/components/button/Button"],
  { autoImportFileExcludePatterns: ["/**/index.*"] });
