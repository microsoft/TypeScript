/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/a.ts
//// function foo() {
////     console.[|log("Hello");|]
//// }
//// class bar {
////     [|constru|]ctor() {
////         function a() {
////             console.log("hii");
////         }
////         a();
////         function b() {
////            function c() {
////                [|console.log("hola");|]
////            }
////         }
////         b();
////     }
////     c() {
////         console.log("hello again");
////         [||]
////     }
//// }

// @Filename: /home/src/workspaces/project/b.ts
//// export const juice = 1;
//// export const sauce = 2;
//// export const tomato = 3;

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["a.ts", "b.ts"] }

verify.pasteEdits({
    args: {
        pastedText: [ 
            `log(sauce);`,`const apple = 1 + juice`,
            `const kiwi = 1;`,
            `function k() {
                const cherry = 3 + tomato + cucumber;
            }`
        ],
        pasteLocations: test.ranges(),
    },
    newFileContents: {
        "/home/src/workspaces/project/a.ts":
`import { sauce, tomato } from "./b";

function foo() {
    console.log(sauce);
}
class bar {
    const apple = 1 + juicector() {
        function a() {
            console.log("hii");
        }
        a();
        function b() {
           function c() {
               const kiwi = 1;
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
