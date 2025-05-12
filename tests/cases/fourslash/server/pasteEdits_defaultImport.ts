/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/folder/folder/c.ts
//// [||]

// @Filename: /home/src/workspaces/project/folder/b.mts
//// import test from "./a.js";
////
//// [|function foo(abc: test.testInterface, def: test.testInterface) {
////    console.log(abc);
////    console.log(def);
//// }|]
//// 

// @Filename: /home/src/workspaces/project/folder/a.ts
//// const abc = 10;
//// const def = 20;
//// export interface testInterface {
////     abc: number;
////     def: number;
//// }

// @Filename: /home/src/workspaces/project/folder/tsconfig.json
////{ "compilerOptions": { "module": "nodenext" }, "files": ["folder/c.ts", "a.ts", "b.mts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`function foo(abc: test.abc, def: test.def) {
console.log(abc);
console.log(def);
}`],
        pasteLocations: [range[0]],
        copiedFrom: { file: "/home/src/workspaces/project/folder/b.mts", range: [range[1]] },
    },
    newFileContents: {
        "/home/src/workspaces/project/folder/folder/c.ts":
`import test from "../a";

function foo(abc: test.abc, def: test.def) {
console.log(abc);
console.log(def);
}`
    }
});