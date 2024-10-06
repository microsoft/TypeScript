/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/a.ts
//// function foo() {
////    const p = 1;
////    [|console.log("yes");|]
//// }
//// class bar {
////     constructor() {
////         function a() {
////             [|console.log("have a good day");|]
////         }
////         a();
////         function b() {
////            function c() {
////                const test = [|1 + 2|] + 3;
////            }  
////         }
////         b();
////     }
////     c() {
////         console.log("hello again");
////         [|function k() {
////             const happy = banana + avocados;
////         }|]
////     }
//// }

// @Filename: /home/src/workspaces/project/b.ts
//// export const juice = 1;
//// export const sauce = 2;
//// export const fig = 3;
//// export const tomato = 4;

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["a.ts", "b.ts"] }

verify.pasteEdits({
    args: {
        pastedText: [
            `const t = 1 + juice + p;`,`function avacado() { return sauce; }`,
            `fig + kiwi`,
            `function k() {
            const cherry = 3 + tomato + cucumber;
        }`
        ],
        pasteLocations: test.ranges(),
    },
    newFileContents: {
        "/home/src/workspaces/project/a.ts":
`import { juice, sauce, fig, tomato } from "./b";

function foo() {
   const p = 1;
   const t = 1 + juice + p;
}
class bar {
    constructor() {
        function a() {
            function avacado() { return sauce; }
        }
        a();
        function b() {
           function c() {
               const test = fig + kiwi + 3;
           }  
        }
        b();
    }
    c() {
        console.log("hello again");
        function k() {
            const cherry = 3 + tomato + cucumber;
        }
    }
}`
    }
});
