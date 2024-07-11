/// <reference path="../fourslash.ts" />

// @Filename: /src/folder/c.ts
//// [||]


// @Filename: /src/a.ts
//// const abc = 10;
//// const def = 20;
//// export interface testInterface {
////     abc: number;
////     def: number;
//// }

// @Filename: /src/b.mts
//// import test from "./a.js";
////
//// [|function foo(abc: test.testInterface, def: test.testInterface) {
////    console.log(abc);
////    console.log(def);
//// }|]
//// 

// @Filename: /src/tsconfig.json
////{ "compilerOptions": { "module": "nodenext" }, "files": ["/src/folder/c.ts", "/src/a.ts", "/src/b.mts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`function foo(abc: test.abc, def: test.def) {
console.log(abc);
console.log(def);
}`],
        pasteLocations: [range[0]],
        copiedFrom: { file: "/src/b.mts", range: [range[1]] },
    },
    newFileContents: {
        "/src/folder/c.ts":
`import test from "../a";

function foo(abc: test.abc, def: test.def) {
console.log(abc);
console.log(def);
}`
    }
});
