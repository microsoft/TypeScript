/// <reference path="fourslash.ts" />

// @moduleResolution: node

// @Filename: /a.ts
////export const x = 0;

// @Filename: /index.ts
////export { x as y } from "./a";

// @Filename: /c.ts
/////**/

goTo.marker("");
verify.completionListContains({ name: "x", source: "/a" }, "const x: 0", "", "const", /*spanIndex*/ undefined, /*hasAction*/ true, {
    includeCompletionsForModuleExports: true,
    sourceDisplay: "./a",
});

verify.applyCodeActionFromCompletion("", {
    name: "x",
    source: "/a",
    description: `Import 'x' from module "./a"`,
    newFileContent: `import { x } from "./a";

`,
});
