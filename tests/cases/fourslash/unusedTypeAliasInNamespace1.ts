/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////         type hw = "Hello" |"world";
////         export type nw = "No" | "Way"; 
//// } |]

verify.codeFixAtPosition(`namespace greeter {
    export type nw = "No" | "Way";
}`);
