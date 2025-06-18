/// <reference path="fourslash.ts" />

// Test with a regular property (not a symbol) to see if the issue is symbol-specific

// @Filename: /exportsRegular.ts
////export const REGULAR_PROP = "regularProp";
////
////export interface ObjWithProp {
////    [REGULAR_PROP]: any;
////}

// @Filename: /usesRegular.ts
////import type { ObjWithProp } from "./exportsRegular";
////
////export declare const thing: ObjWithProp;
////
////function main() {
////    thing[/**/];
////}

verify.completions({
    marker: "",
    includes: [
        { name: "REGULAR_PROP", source: "/exportsRegular", hasAction: true, sortText: "16" },
    ],
    preferences: {
        includeCompletionsForModuleExports: true,
    },
});

verify.applyCodeActionFromCompletion("", {
    name: "REGULAR_PROP",
    source: "/exportsRegular",
    description: `Update import from "./exportsRegular"`,
    newFileContent:
`import { REGULAR_PROP, type ObjWithProp } from "./exportsRegular";

export declare const thing: ObjWithProp;

function main() {
    thing[REGULAR_PROP];
}`
});