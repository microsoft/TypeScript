/// <reference path="../fourslash.ts" />

// @Filename: /a.ts
//// const ll = kkk;
//// 
//// function foo() {[||]
////    const oip = 123;
////    [||]
//// }
//// [||]
//// 

// @Filename: /b.ts
//// export const a = 1;
//// export const t = 1;
//// export function foo() {}
//// export const kkk = a + t;

// @Filename: /tsconfig.json
////{ "files": ["a.ts", "b.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`export const kkk = a + t;`, `const yuy = 1;`],
        pasteLocations: [range[0], range[1], range[2]],
    },
    newFileContents: {
        "/a.ts":
`import { a, t } from "./b";

const ll = kkk;


export const kkk = a + t;
`
    }
});
