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
    goTo.marker(marker);
    verify.completionListContains({ name: "x", source: "/src/a" }, "const x: 0", "", "const", /*spanIndex*/ undefined, /*hasAction*/ true, { includeCompletionsForModuleExports: true, sourceDisplay });
    verify.applyCodeActionFromCompletion(marker, {
        name: "x",
        source: "/src/a",
        description: `Import 'x' from module "${sourceDisplay}"`,
        newFileContent: `import { x } from "${sourceDisplay}";\n\nx`,
    });
}
