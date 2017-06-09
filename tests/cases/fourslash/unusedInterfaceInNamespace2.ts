/// <reference path='fourslash.ts' />

// @noUnusedLocals: true
////namespace greeter {
////    [| export interface interface2 {
////    }
////    interface interface1 {
////    } |]
////}

verify.rangeAfterCodeFix(`export interface interface2 {
}`);
