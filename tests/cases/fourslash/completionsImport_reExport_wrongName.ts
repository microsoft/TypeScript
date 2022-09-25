/// <reference path="fourslash.ts" />

// @moduleResolution: node

// @Filename: /a.ts
////export const x = 0;

// @Filename: /index.ts
////export { x as y } from "./a";

// @Filename: /c.ts
/////**/

goTo.marker("");
verify.completions({
    marker: "",
    includes: [
        {
            name: "x",
            source: "/a",
            sourceDisplay: "./a",
            text: "const x: 0",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
        {
            name: "y",
            source: "/index",
            sourceDisplay: ".",
            text: "(alias) const y: 0\nexport y",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
    ],
    preferences: { includeCompletionsForModuleExports: true },
});
verify.applyCodeActionFromCompletion("", {
    name: "x",
    source: "/a",
    description: `Add import from "./a"`,
    newFileContent: `import { x } from "./a";

`,
});
verify.applyCodeActionFromCompletion("", {
    name: "y",
    source: "/index",
    description: `Add import from "."`,
    newFileContent: `import { y } from ".";
import { x } from "./a";

`,
});
