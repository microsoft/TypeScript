/// <reference path='fourslash.ts'/>

////namespace TypeModule1 {
////    export class C1 { }
////    export class C2 { }
////}
////var x: TypeModule1./*namedType*/
////namespace TypeModule2 {
////    export class Test3 {}
////}
////
////TypeModule1./*dottedExpression*/
////namespace TypeModule3 {
////    export class Test3 {}
////}

// Verify the memberlist of module when the following line has a keyword
verify.completions(
    { marker: test.markers(), exact: ["C1", "C2"] },
);
