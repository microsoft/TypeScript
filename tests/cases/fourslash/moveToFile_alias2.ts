
/// <reference path='fourslash.ts' />


// @filename: /producer.ts
//// export function doit() {};
//// export const x = 1;

// @filename: /test.ts
//// import { doit as doit2 } from "./producer";
//// 
//// class Another {}
//// 
//// [|class Consumer {
////     constructor() {
////         doit2();
////     }
//// }|]

// @filename: /consumer.ts
//// import { x } from "./producer";
//// x;

verify.moveToFile({
    newFileContents: {
        "/test.ts":
`
class Another {}

`,

    "/consumer.ts":
`import { doit as doit2, x } from "./producer";
x;
class Consumer {
    constructor() {
        doit2();
    }
}
`
    },
    interactiveRefactorArguments: { targetFile: "/consumer.ts" },
});
