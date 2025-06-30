
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

verify.moveToNewFile({
    newFileContents: {
        "/test.ts":
`
class Another {}

`,

    "/Consumer.ts":
`import { doit as doit2 } from "./producer";

class Consumer {
    constructor() {
        doit2();
    }
}
`
    }
});
