/// <reference path='fourslash.ts' />

/////*label1Definition*/label1: while (true) {
////    /*label2Definition*/label2: while (true) {
////        break [|/*1*/label1|];
////        continue [|/*2*/label2|];
////        () => { break [|/*3*/label1|]; }
////        continue /*4*/unknownLabel;
////    }
////}

verify.goToDefinition({
    1: "label1Definition",
    2: "label2Definition",
    // labels across function boundaries
    3: "label1Definition",
    // undefined label
    4: []
});
