/// <reference path='fourslash.ts'/>

////module M {
////    enum E {
////        A, B
////    }
////    enum E {
////        C = 0, D
////    }
////    var x = E./*1*/
////}

verify.completions({
    marker: "1",
    exact: [
        { name: "A", text: "(enum member) E.A = 0" },
        { name: "B", text: "(enum member) E.B = 1" },
        { name: "C", text: "(enum member) E.C = 0" },
        { name: "D", text: "(enum member) E.D = 1" },
    ],
});
