/// <reference path='fourslash.ts' />

////var a/*1*/1 = new Array();
////var a/*2*/2 = new Array(1);
////var a/*3*/3 = new Array<boolean>();
////var a/*4*/4 = new Array<boolean>(1);
////var a/*5*/5 = new Array("s");
////var a/*6*/6 = Array();
////var a/*7*/7 = Array(1);
////var a/*8*/8 = Array<boolean>();
////var a/*9*/9 = Array<boolean>(1);
////var a/*10*/10 = Array("s");

verify.quickInfos({
    1: "var a1: any[]",
    2: "var a2: any[]",
    3: "var a3: boolean[]",
    4: "var a4: boolean[]",
    5: "var a5: string[]",
    6: "var a6: any[]",
    7: "var a7: any[]",
    8: "var a8: boolean[]",
    9: "var a9: boolean[]",
    10: "var a10: string[]"
});
