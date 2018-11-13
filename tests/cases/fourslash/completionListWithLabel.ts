/// <reference path="fourslash.ts"/>

//// label: while (true) {
////    break /*1*/
////    continue /*2*/
////    testlabel: while (true) {
////        break /*3*/
////        continue /*4*/
////        break tes/*5*/
////        continue tes/*6*/
////    }
////    break /*7*/
////    break; /*8*/
////}

verify.completions(
    { marker: ["1", "2", "7"], exact: "label" },
    { marker: ["3", "4", "5", "6"], exact: ["testlabel", "label"] },
    { marker: "8", excludes: ["label"] },
);
