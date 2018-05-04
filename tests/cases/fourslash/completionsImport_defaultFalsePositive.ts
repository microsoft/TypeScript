/// <reference path="fourslash.ts" />

// @Filename: /node_modules/foo/index.ts
////export default function f(): void;

// @Filename: /node_modules/bar/concat.d.ts
////export const concat = 0;

// @Filename: /a.ts
////export {};
////conca/**/

goTo.file("/a.ts");

verify.completions({
    marker: "",
    includes: [
        { name: "concat", source: "/node_modules/bar/concat", sourceDisplay: "bar/concat", text: "const concat: 0", kind: "const", hasAction: true },
    ],
    preferences: { includeCompletionsForModuleExports: true },
});

verify.applyCodeActionFromCompletion("", {
    name: "concat",
    source: "/node_modules/bar/concat",
    description: `Import 'concat' from module "bar/concat"`,
    newFileContent:
`import { concat } from "bar/concat";

export {};
conca`,
});
