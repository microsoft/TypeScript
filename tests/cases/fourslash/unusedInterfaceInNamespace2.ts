/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    [| export interface interface2 {
////    }
////    interface interface1 {
////    } |]
////}

verify.codeFixAtPosition(`export interface interface2 {
}`);
