
/// <reference path='fourslash.ts' />


// @filename: /producer.ts
//// export function doit() {}

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
////


verify.moveToFile({
    newFileContents: {
        "/test.ts":
`
class Another {}

`,

    "/consumer.ts":
`import { doit as doit2 } from "./producer";


class Consumer {
    constructor() {
        doit2();
    }
}
`
    },
    interactiveRefactorArguments: { targetFile: "/consumer.ts" },
});
