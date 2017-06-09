/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
//// [| namespace greeter {
////         type hw = "Hello" |"world";
////         export type nw = "No" | "Way"; 
//// } |]

verify.rangeAfterCodeFix(`namespace greeter {
    export type nw = "No" | "Way";
}`);
