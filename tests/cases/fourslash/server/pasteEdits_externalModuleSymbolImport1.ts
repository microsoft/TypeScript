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

// @Filename: /b.ts
//// import * as test from "./a";
////
//// [|function foo(abc: test.testInterface, def: test.testInterface) {
////    console.log(abc);
////    console.log(def);
//// }|]
//// 

// @Filename: /tsconfig.json
////{ "files": ["/folder/c.ts", "/a.ts", "/b.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`function foo(abc: test.abc, def: test.def) {
console.log(abc);
console.log(def);
}`],
        pasteLocations: [range[0]],
        copiedFrom: { file: "/b.ts", range: [range[1]] },
    },
    newFileContents: {
        "/folder/c.ts":
`import * as test from "../a";

function foo(abc: test.abc, def: test.def) {
console.log(abc);
console.log(def);
}`
    }
});

