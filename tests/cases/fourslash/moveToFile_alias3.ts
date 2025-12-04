
/// <reference path='fourslash.ts' />


// @filename: /producer.ts
//// export function doit() {};

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
//// import { doit } from "./producer"; // existing import does not change when alias imported
//// doit();

verify.moveToFile({
    newFileContents: {
        "/test.ts":
`
class Another {}

`,

    "/consumer.ts":
`import { doit } from "./producer"; // existing import does not change when alias imported
doit();
class Consumer {
    constructor() {
        doit2();
    }
}
`
    },
    interactiveRefactorArguments: { targetFile: "/consumer.ts" },
});
