/// <reference path='fourslash.ts' />

/////*label1Definition*/label1: while (true) {
////    /*label2Definition*/label2: while (true) {
////        break [|/*1*/label1|];
////        continue [|/*2*/label2|];
////        () => { break [|/*3*/label1|]; }
////        continue /*4*/unknownLabel;
////    }
////}

verify.baselineGoToDefinition(
    "1",
    "2",
    // labels across function boundaries
    "3",
    // undefined label
    "4",
);
