/// <reference path='fourslash.ts'/>

////module TypeModule1 {
////    export class C1 { }
////    export class C2 { }
////}
////var x: TypeModule1./*namedType*/
////module TypeModule2 {
////    export class Test3 {}
////}
////
////TypeModule1./*dottedExpression*/
////module TypeModule3 {
////    export class Test3 {}
////}

// Verify the memberlist of module when the following line has a keyword
verify.completions(
    { marker: test.markers(), exact: ["C1", "C2"] },
);
