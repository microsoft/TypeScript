/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/a.ts
//// function foo() {
////    [|const p = 1;|]
//// }
//// function too() {
////    function k([|t: string|]) {
////        console.log(t);
////    }
//// }
//// class bar {
////     constructor() {
////         function a() {
//// [|            console.log("hello");|]
////         }
////         a();
////     }
////     c() {
////         console.log("hello again");
////         [|function k() {
////             const happy = banana + avocados;
////         }|]
////     }
//// }

// @Filename: /home/src/workspaces/project/b.ts
//// export const juices = 1;
//// export const sauce = 2;

// @Filename: /home/src/workspaces/project/c.ts
//// export const figs = 3;
//// export const tomato = 4;

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["a.ts", "b.ts", "c.ts"] }

verify.pasteEdits({
    args: {
        pastedText: [ 
            `const t = figs;`,`apples : number`,
            `             console.log(sauce + tomato); `,
            `//function k(i:string) {
         const cherry = 3 + juices + cucumber;
//      }`
        ],
        pasteLocations: test.ranges(),
    },
    newFileContents: {
        "/home/src/workspaces/project/a.ts":
`import { sauce, juices } from "./b";
import { figs, tomato } from "./c";

function foo() {
   const t = figs;
}
function too() {
   function k(apples : number) {
       console.log(t);
   }
}
class bar {
    constructor() {
        function a() {
             console.log(sauce + tomato); 
        }
        a();
    }
    c() {
        console.log("hello again");
        //function k(i:string) {
         const cherry = 3 + juices + cucumber;
//      }
    }
}`
    }
});
