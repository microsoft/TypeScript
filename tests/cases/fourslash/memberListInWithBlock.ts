/// <reference path='fourslash.ts'/>

////class c {
////    static x: number;
////    public foo() {
////        with ({}) {
////            function f() { }
////            var d = this./*1*/foo;
////            /*2*/
////        }
////    }
////}

verify.completions(
    { marker: "1", exact: undefined },
    // Only keywords should show in completion, no members or types
    { marker: "2", excludes: ["foo", "f", "c", "d", "x", "Object"] },
);
