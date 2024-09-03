/// <reference path="../fourslash.ts" />

// @Filename: /a.ts
//// function foo() {
////    const p = 1;
////    console.log("[|yes|]");
//// }
//// class bar {
////     constructor() {
////         function a() {
////           const regex = /x[||]/g;
////           console.log("have a good day");
////         }
////         a();
////         function b() {
////            function c() {
////                // [|const test = 1 + 2 + 3|];
////            }
////         }
////         b();
////     }
////     c() {
////         console.log("hello again");
////         /** [||] */
////         [||]
////     }
//// }

// @Filename: /b.ts
//// export const aa = 1;
//// export const bb = 2;
//// export const cc = 3;
//// export const dd = 4;
//// export const ee = 5;
//// [|const juice = aa|];
//// [|const sauce = bb|];
//// [|const fig = cc|];
//// [|const tomato = dd|];
//// [|const apple = ee|];

// @Filename: /tsconfig.json
////{ "files": ["a.ts", "b.ts"] }

const ranges = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [
            `const juice = aa`,
            `const sauce = bb`,
            `const fig = cc`,
            `const tomato = dd`,
            `const apple = ee`
    ],
    pasteLocations: [ranges[0], ranges[1], ranges[2], ranges[3], ranges[4]],
    copiedFrom: { file: "b.ts", range: [ranges[5], ranges[6], ranges[7], ranges[8], ranges[9]] },
    },
    newFileContents: {
        "/a.ts":
`import { ee } from "./b";

function foo() {
   const p = 1;
   console.log("const juice = aa");
}
class bar {
    constructor() {
        function a() {
          const regex = /xconst sauce = bb/g;
          console.log("have a good day");
        }
        a();
        function b() {
           function c() {
               // const fig = cc;
           }
        }
        b();
    }
    c() {
        console.log("hello again");
        /** const tomato = dd */
        const apple = ee
    }
}`
    }
});
 