/// <reference path="fourslash.ts" />

// Test for issue #61894: Symbol auto-import bug with existing type-only imports
// Verifies that symbols used in element access expressions are imported as values,
// not added to existing type-only imports, when completing inside thing[...]

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
////import type { ObjWithSym } from "./exportsSymbol";
////
////export declare const thing: ObjWithSym;
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

// Verify the fix - the symbol should be imported as a value, not as a type
verify.applyCodeActionFromCompletion("", {
    name: "SYM_FOO_BAR",
    source: "/exportsSymbol",
    description: `Update import from "./exportsSymbol"`,
    newFileContent:
`import { SYM_FOO_BAR, type ObjWithSym } from "./exportsSymbol";

export declare const thing: ObjWithSym;

function main() {
    thing.
}`
});