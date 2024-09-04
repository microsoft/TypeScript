/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/a.ts
//// function foo() {
////     [|console.log("yes");|]
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
////              const happy = 1 + banana + avocados;
////         }|]
////     }
//// }

// @Filename: /home/src/workspaces/project/b.ts
//// export const juice = 1;
//// export const sauce = 2;
//// export const apple = 3;
//// export const tomato = 4;

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["a.ts", "b.ts"] }

verify.pasteEdits({
    args: {
        pastedText: [ 
            `console.log(juice);`,`function kl() { return sauce; }`,
            `apple`,
            `function k() {
       const cherry = 3 + tomato + cucumber;
        }`
        ],
        pasteLocations: test.ranges(),
    },
    newFileContents: {
        "/home/src/workspaces/project/a.ts":
`import { juice, sauce, tomato } from "./b";

function foo() {
    console.log(juice);
}
class bar {
    constructor() {
        function a() {
            function kl() { return sauce; }
        }
        a();
        function b() {
           function c() {
               const test = apple + 3;
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
