/// <reference path='fourslash.ts'/>

////function f() {
////    namespace n {
////        interface I {
////            x: number
////        }
////        /*1*/
////    }
////    /*2*/
////}
/////*3*/
////function f2() {
////    namespace n2 {
////        class I2 {
////            x: number
////        }
////        /*11*/
////    }
////    /*22*/
////}
/////*33*/

verify.completions(
    { marker: ["1", "2", "3"], includes: { name: "f", text: "function f(): void" }, excludes: ["n", "I"] },
    {
        marker: "11",
        includes: [
            { name: "f2", text: "function f2(): void" },
            { name: "n2", text: "namespace n2" },
            { name: "I2", text: "class I2" },
        ],
    },
    {
        marker: "22",
        includes: [
            { name: "f2", text: "function f2(): void" },
            { name: "n2", text: "namespace n2" },
        ],
        excludes: "I2",
    },
    {
        marker: "33",
        includes: { name: "f2", text: "function f2(): void" },
        excludes: ["n2", "I2"],
    },
);
