/// <reference path="fourslash.ts" />

//// [|let t: A/*0*/.B.I;|]

// @Filename: ./module.ts
//// export namespace A {
////    export namespace B {
////        export interface I { }
////    }
//// }

verify.importFixAtPosition([
`import type { A } from "./module";

let t: A.B.I;`
]);