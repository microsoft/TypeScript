/// <reference path="fourslash.ts" />

////// Completion after dot in named type, when the following line has a keyword
////module TypeModule1 {
////    export class C1 {}
////    export class C2 {}
////}
////var x : TypeModule1./*TypeReference*/
////module TypeModule2 {
////    export class Test3 {}
////}
////
////// Completion after dot in named type, when the following line has a keyword
////TypeModule1./*ValueReference*/
////module TypeModule3 {
////    export class Test3 {}
////}

verify.completions({ marker: test.markers(), exact: ["C1", "C2"] });
