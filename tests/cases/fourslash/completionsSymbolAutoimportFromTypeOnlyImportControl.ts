/// <reference path="fourslash.ts" />

// Control test for issue #61894: Symbol auto-import without existing type-only imports
// Verifies that symbols are correctly imported as values when there are no existing imports

// @noLib: true

// @Filename: /globals.d.ts
////declare const Symbol: { for(key: string): symbol };

// @Filename: /exportsSymbol.ts
////export const SYM_FOO_BAR = Symbol.for("foo.bar");
////
////export interface ObjWithSym {
////    [SYM_FOO_BAR]: any;
////}

// @Filename: /usesSymbol.ts
////export declare const thing: import("./exportsSymbol").ObjWithSym;
////
////function main() {
////    thing[|./**/|]
////}

verify.completions({
    marker: "",
    includes: [
        { name: "SYM_FOO_BAR", source: "/exportsSymbol", insertText: "[SYM_FOO_BAR]", replacementSpan: test.ranges()[0], hasAction: true },
    ],
    preferences: {
        includeInsertTextCompletions: true,
        includeCompletionsForModuleExports: true,
    },
});

verify.applyCodeActionFromCompletion("", {
    name: "SYM_FOO_BAR",
    source: "/exportsSymbol",
    description: `Add import from "./exportsSymbol"`,
    newFileContent:
`import { SYM_FOO_BAR } from "./exportsSymbol";

export declare const thing: import("./exportsSymbol").ObjWithSym;

function main() {
    thing.
}`
});