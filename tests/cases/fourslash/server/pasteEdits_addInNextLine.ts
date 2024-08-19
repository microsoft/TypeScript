/// <reference path="../fourslash.ts" />

// @Filename: /a.ts
////
////
////
//// [||]
//// 

// @Filename: /b.ts
//// export interface Foo { }
//// export const a = 1;
//// export const t = 1;
////
//// [|export const foo: Foo = { };|]
//// [|export const k = a+ t;|]

// @Filename: /tsconfig.json
////{ "files": ["a.ts", "b.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`export const foo: Foo = {};`],
        pasteLocations: [range[0]],
        copiedFrom: { file: "b.ts", range: [range[1]] },
    },
    newFileContents: {
        "/a.ts":
`import { Foo } from "./b";



export const foo: Foo = {};
`
    }
});
