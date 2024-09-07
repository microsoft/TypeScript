/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/a.ts
////
////
////
//// [||]
//// 

// @Filename: /home/src/workspaces/project/b.ts
//// export interface Foo { }
//// export const a = 1;
//// export const t = 1;
////
//// [|export const foo: Foo = { };|]
//// [|export const k = a+ t;|]

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["a.ts", "b.ts"] }

const ranges = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`export const foo: Foo = {};`],
        pasteLocations: [ranges[0]],
        copiedFrom: { file: "/home/src/workspaces/project/b.ts", range: [ranges[1]] },
    },
    newFileContents: {
        "/home/src/workspaces/project/a.ts":
`import { Foo } from "./b";



export const foo: Foo = {};
`
    }
});
