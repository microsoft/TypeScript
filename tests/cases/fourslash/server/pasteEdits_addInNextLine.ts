/// <reference path="../fourslash.ts" />

// @Filename: /a.ts
////
//// [||]
////
////
//// [||]
//// 

// @Filename: /b.ts
//// export interface Foo { }
////
//// [|export const foo: Foo = {};|]

// @Filename: /tsconfig.json
////{ "files": ["a.ts", "b.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`export const foo: Foo = {};`],
        pasteLocations: [range[0], range[1]],
        copiedFrom: { file: "b.ts", range: [range[2]] },
    },
    newFileContents: {
        "/a.ts":
`import { Foo } from "./b";


export const foo: Foo = {};
console.log(abc);`
    }
});
