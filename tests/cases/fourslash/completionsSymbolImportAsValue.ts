/// <reference path="fourslash.ts" />

// @Filename: /exportsSymbol.ts
////export const SYM_FOO_BAR = Symbol.for("foo.bar");
////
////export interface ObjWithSym {
////    [SYM_FOO_BAR]: any;
////}

// @Filename: /usesSymbol.ts
////import type { ObjWithSym } from "./exportsSymbol";
////
////export declare const thing: ObjWithSym;
////
////function main() {
////    thing[/**/];
////}

verify.completions({
    marker: "",
    includes: [
        { name: "SYM_FOO_BAR", source: "/exportsSymbol", hasAction: true, sortText: "16" },
    ],
    preferences: {
        includeCompletionsForModuleExports: true,
    },
});

verify.applyCodeActionFromCompletion("", {
    name: "SYM_FOO_BAR",
    source: "/exportsSymbol",
    description: `Update import from "./exportsSymbol"`,
    newFileContent:
`import { SYM_FOO_BAR, type ObjWithSym } from "./exportsSymbol";

export declare const thing: ObjWithSym;

function main() {
    thing[SYM_FOO_BAR];
}`
});