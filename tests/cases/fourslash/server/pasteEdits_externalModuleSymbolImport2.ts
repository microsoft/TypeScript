/// <reference path="../fourslash.ts" />

// @Filename: /src/folder/c.ts
//// import type * as test from "../a";
////
//// function foo(abc: test.abc, def: test.def) {
//// console.log(abc);
//// }
//// [||]
////

// @Filename: /src/a.ts
//// const abc = 10;
//// const def = 20;
//// export interface testInterface {
////     abc: number;
////     def: number;
//// }

// @Filename: /src/b.ts
//// import type * as test from "./a";
////
//// [|function foo(abc: test.testInterface, def: test.testInterface) {
////    console.log(abc);
////    console.log(def);
//// }|]
//// 

// @Filename: /tsconfig.json
////{ "files": ["/src/folder/c.ts", "/src/a.ts", "/src/b.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`function foo(abc: test.abc, def: test.def) {
console.log(abc);
console.log(def);
}`],
        pasteLocations: [range[0]],
        copiedFrom: { file: "/src/b.ts", range: [range[1]] },
    },
    newFileContents: {
        "/src/folder/c.ts":
`import type * as test from "../a";

function foo(abc: test.abc, def: test.def) {
console.log(abc);
}
function foo(abc: test.abc, def: test.def) {
console.log(abc);
console.log(def);
}
`
    }
});

