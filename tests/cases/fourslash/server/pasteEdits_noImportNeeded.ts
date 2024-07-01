/// <reference path="../fourslash.ts" />

// @Filename: /b.ts
////[||]

// @Filename: /a.ts
//// export interface Foo { }
////
//// [|export|] const foo: Foo = {}

// @Filename: /tsconfig.json
////{ "files": ["a.ts", "b.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`export`],
        pasteLocations: [range[0]],
        copiedFrom: { file: "a.ts", range: [range[1]] },
    },
    newFileContents: {
        "/b.ts":
`export`
    }
});
