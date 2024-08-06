/// <reference path="../fourslash.ts" />

// @Filename: /a.ts
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

// @Filename: /b.ts
//// export const juice = 1;
//// export const sauce = 2;
//// export const tomato = 3;

// @Filename: /tsconfig.json
////{ "files": ["a.ts", "b.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [ `const mango = 2 + sauce;`,`const apple = 1 + juice`,
            `const strawberry = 1;`,
            `function k() {
                const cherry = 3 + tomato + cucumber;
            }`
],
        pasteLocations: [range[0], range[1], range[2], range[3]],
    },
    newFileContents: {
        "/a.ts":
`import { sauce, tomato } from "./b";

function foo() {
    console.const mango = 2 + sauce;
}
class bar {
    const apple = 1 + juicector() {
        function a() {
            console.log("hii");
        }
        a();
        function b() {
           function c() {
               const strawberry = 1;
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
