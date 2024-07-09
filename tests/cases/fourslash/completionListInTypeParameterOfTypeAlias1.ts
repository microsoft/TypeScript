/// <reference path='fourslash.ts'/>

////type List1</*0*/
////type List2</*1*/T> = T[];
////type List4<T> = /*2*/T[];
////type List3<T1> = /*3*/;

verify.completions(
    { marker: ["0", "1"], exact: undefined },
    { marker: "2", includes: "T" },
    { marker: "3", includes: "T1", excludes: "T" },
);
