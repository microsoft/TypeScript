/// <reference path='fourslash.ts'/>

////var strOrNum: string | number;
////module m {
////    var nonExportedStrOrNum: string | number;
////    export var exportedStrOrNum: string | number;
////    var num: number;
////    var str: string;
////    if (typeof /*1*/nonExportedStrOrNum === "number") {
////        num = /*2*/nonExportedStrOrNum; 
////    }
////    else {
////        str = /*3*/nonExportedStrOrNum.length;
////    }
////    if (typeof /*4*/exportedStrOrNum === "number") {
////        strOrNum = /*5*/exportedStrOrNum;
////    }
////    else {
////        strOrNum = /*6*/exportedStrOrNum;
////    }
////}
////if (typeof m./*7*/exportedStrOrNum === "number") {
////    strOrNum = m./*8*/exportedStrOrNum;
////}
////else {
////    strOrNum = m./*9*/exportedStrOrNum;
////}

goTo.marker('1');
verify.quickInfoIs('(var) nonExportedStrOrNum: string | number');
verify.completionListContains("nonExportedStrOrNum", "(var) nonExportedStrOrNum: string | number");

goTo.marker('2');
verify.quickInfoIs('(var) nonExportedStrOrNum: number');
verify.completionListContains("nonExportedStrOrNum", "(var) nonExportedStrOrNum: number");

goTo.marker('3');
verify.quickInfoIs('(var) nonExportedStrOrNum: string');
verify.completionListContains("nonExportedStrOrNum", "(var) nonExportedStrOrNum: string");

['4', '5', '6', '7', '8', '9'].forEach((marker, index, arr) => {
    goTo.marker(marker);
    verify.quickInfoIs('(var) m.exportedStrOrNum: string | number');
    verify.completionListContains("exportedStrOrNum", "(var) m.exportedStrOrNum: string | number");
});

['7', '8', '9'].forEach((marker, index, arr) => {
    goTo.marker(marker);
    verify.quickInfoIs('(var) m.exportedStrOrNum: string | number');
    verify.memberListContains("exportedStrOrNum", "(var) m.exportedStrOrNum: string | number");
});