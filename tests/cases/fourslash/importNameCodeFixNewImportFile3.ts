/// <reference path="fourslash.ts" />

//// [|let t: XXX/*0*/.I;|]

// @Filename: ./module.ts
//// export module XXX {
////    export interface I {
////    }
//// }

verify.importFixAtPosition([
`import type { XXX } from "./module";

let t: XXX.I;`
]);