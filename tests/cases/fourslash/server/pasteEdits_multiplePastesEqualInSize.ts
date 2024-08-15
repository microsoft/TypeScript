/// <reference path="../fourslash.ts" />

// @Filename: /a.ts
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

// @Filename: /b.ts
//// export const juice = 1;
//// export const sauce = 2;
//// export const apple = 3;
//// export const tomato = 4;

// @Filename: /tsconfig.json
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
        "/a.ts":
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
