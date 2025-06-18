/// <reference path="fourslash.ts" />

// Test with property access (not element access) to see if the issue is element-access-specific

// @Filename: /exportsRegular.ts
////export const REGULAR_PROP = "regularProp";
////
////export interface ObjWithProp {
////    regularMethod(): any;
////}

// @Filename: /usesRegular.ts
////import type { ObjWithProp } from "./exportsRegular";
////
////export declare const thing: ObjWithProp;
////
////function main() {
////    /**/;
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
    REGULAR_PROP;
}`
});