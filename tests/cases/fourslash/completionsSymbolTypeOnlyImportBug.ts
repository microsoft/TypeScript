/// <reference path="fourslash.ts" />

// Test case for symbol property auto-import issue
// Should import symbol as value, not type when there's already a type-only import

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
////    thing[|SYM_FOO_BAR/**/|]
////}

verify.completions({
    marker: "",
    exact: [
        { name: "SYM_FOO_BAR", source: "/exportsSymbol", insertText: "SYM_FOO_BAR", hasAction: true },
    ],
    preferences: {
        includeInsertTextCompletions: true,
        includeCompletionsForModuleExports: true,
    },
});

// This should create a separate value import, not add to the existing type-only import
verify.applyCodeActionFromCompletion("", {
    name: "SYM_FOO_BAR",
    source: "/exportsSymbol",
    description: `Add import from "./exportsSymbol"`,
    newFileContent:
`import type { ObjWithSym } from "./exportsSymbol";
import { SYM_FOO_BAR } from "./exportsSymbol";

export declare const thing: ObjWithSym;

function main() {
    thing[SYM_FOO_BAR]
}`
});