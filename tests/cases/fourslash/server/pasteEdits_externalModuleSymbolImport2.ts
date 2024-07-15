/// <reference path="../fourslash.ts" />

// @Filename: /folder/c.ts
//// [||]


// @Filename: /a.ts
//// const abc = 10;
//// const def = 20;
//// export interface testInterface {
////     abc: number;
////     def: number;
//// }

// @Filename: /b.mts
//// import test from "./a.js";
////
//// [|function foo(abc: test.testInterface, def: test.testInterface) {
////    console.log(abc);
////    console.log(def);
//// }|]
//// 

// @Filename: /tsconfig.json
////{ "compilerOptions": { "module": "nodenext" }, "files": ["/folder/c.ts", "/a.ts", "/b.mts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`function foo(abc: test.abc, def: test.def) {
console.log(abc);
console.log(def);
}`],
        pasteLocations: [range[0]],
        copiedFrom: { file: "/b.mts", range: [range[1]] },
    },
    newFileContents: {
        "/folder/c.ts":
`import test from "../a";

function foo(abc: test.abc, def: test.def) {
console.log(abc);
console.log(def);
}`
    }
});
