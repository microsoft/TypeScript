/// <reference path="fourslash.ts" />

// @Filename: /src/a.ts
////export const x = 0;

// @Filename: /src/index.ts
////export { x } from "./a";

// @Filename: /0.ts
////x/*0*/

// @Filename: /src/1.ts
////x/*1*/

// @Filename: /src/inner/2.ts
////x/*2*/

for (const [marker, sourceDisplay] of [["0", "./src"], ["1", "./a"], ["2", "../a"]]) {
    verify.completions({
        marker,
        includes: {
            name: "x",
            source: "/src/a",
            sourceDisplay,
            text: "const x: 0",
            kind: "const",
            kindModifiers: "export",
            hasAction: true,
            sortText: completion.SortText.AutoImportSuggestions
        },
        preferences: { includeCompletionsForModuleExports: true },
    });
    verify.applyCodeActionFromCompletion(marker, {
        name: "x",
        source: "/src/a",
        description: `Add import from "${sourceDisplay}"`,
        newFileContent: `import { x } from "${sourceDisplay}";\n\nx`,
    });
}
