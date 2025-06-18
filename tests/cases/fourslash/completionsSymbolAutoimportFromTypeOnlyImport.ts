/// <reference path="fourslash.ts" />

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

// This should demonstrate the bug - the symbol should be imported as a value, not as a type
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