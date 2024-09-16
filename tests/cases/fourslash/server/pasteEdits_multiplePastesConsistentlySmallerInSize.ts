/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/a.ts
//// function foo() {
////    const p = 1;
////    function bar() {
////        console.log([|"Testing"|]);
////    }
////    console.log("yes");
//// }
//// class bar {
////     constructor() {
////         function a() {
////            function aa() {
////                con[|sole.log("have a good day");|]
////            }
////             
////         }
////         a();
////         function b() {
////            function c() {
////                export const testing = 1;
////                const test = [|1 + testing + |]3;
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
            `juice`,`sole.log(sauce + juice);`,
            `fig + kiwi`,
            `function k() {
            const cherry =tomato + kiwi;
        }`
        ],
        pasteLocations: test.ranges(),
    },
    newFileContents: {
        "/home/src/workspaces/project/a.ts":
`import { sauce, juice, fig, tomato } from "./b";

function foo() {
   const p = 1;
   function bar() {
       console.log(juice);
   }
   console.log("yes");
}
class bar {
    constructor() {
        function a() {
           function aa() {
               console.log(sauce + juice);
           }
            
        }
        a();
        function b() {
           function c() {
               export const testing = 1;
               const test = fig + kiwi3;
           }
        }
        b();
    }
    c() {
        console.log("hello again");
        function k() {
            const cherry =tomato + kiwi;
        }
    }
}`
    }
});
