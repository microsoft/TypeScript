/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////    export class class2 {
////    }
////    class class1 {
////    }
//// } |]

verify.codeFixAtPosition(`namespace greeter {
    export class class2 {
    }
}`);

