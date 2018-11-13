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

verify.quickInfos({
    1: "var nonExportedStrOrNum: string | number",
    2: "var nonExportedStrOrNum: number",
    3: "var nonExportedStrOrNum: string",
    4: "var m.exportedStrOrNum: string | number",
    5: "var m.exportedStrOrNum: number",
    6: "var m.exportedStrOrNum: string",
    7: "var m.exportedStrOrNum: string | number",
    8: "var m.exportedStrOrNum: number",
    9: "var m.exportedStrOrNum: string",
});

verify.completions(
    { marker: "1", includes: { name: "nonExportedStrOrNum", text: "var nonExportedStrOrNum: string | number" } },
    { marker: "2", includes: { name: "nonExportedStrOrNum", text: "var nonExportedStrOrNum: number" }, isNewIdentifierLocation: true },
    { marker: "3", includes: { name: "nonExportedStrOrNum", text: "var nonExportedStrOrNum: string" }, isNewIdentifierLocation: true },
    { marker: "4", includes: { name: "exportedStrOrNum", text: "var exportedStrOrNum: string | number" } },
    { marker: "5", includes: { name: "exportedStrOrNum", text: "var exportedStrOrNum: number" }, isNewIdentifierLocation: true },
    { marker: "6", includes: { name: "exportedStrOrNum", text: "var exportedStrOrNum: string" }, isNewIdentifierLocation: true },
    { marker: "7", includes: { name: "exportedStrOrNum", text: "var m.exportedStrOrNum: string | number" } },
    { marker: "8", includes: { name: "exportedStrOrNum", text: "var m.exportedStrOrNum: number" } },
    { marker: "9", includes: { name: "exportedStrOrNum", text: "var m.exportedStrOrNum: string" } },
);
