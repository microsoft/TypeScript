/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/folder/c.ts
//// [||]


// @Filename: /home/src/workspaces/project/a.ts
//// const abc = 10;
//// const def = 20;
//// export interface testInterface {
////     abc: number;
////     def: number;
//// }

// @Filename: /home/src/workspaces/project/b.ts
//// import * as test from "./a";
////
//// [|function foo(abc: test.abc, def: test.def) {
////    console.log(abc);
////    console.log(def);
//// }|]
//// 

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["folder/c.ts", "a.ts", "b.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`function foo(abc: test.abc, def: test.def) {
console.log(abc);
console.log(def);
}`],
        pasteLocations: [range[0]],
        copiedFrom: { file: "/home/src/workspaces/project/b.ts", range: [range[1]] },
    },
    newFileContents: {
        "/home/src/workspaces/project/folder/c.ts":
`import * as test from "../a";

function foo(abc: test.abc, def: test.def) {
console.log(abc);
console.log(def);
}`
    }
});