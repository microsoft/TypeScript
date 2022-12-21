/// <reference path='fourslash.ts'/>

////interface I {
////    x/*1*/1(a: number, callback: (x: 'hi') => number);
////}

////class C {
////    x/*2*/1(a: number, call/*3*/back: (x: 'hi') => number);
////    x/*4*/1(a: number, call/*5*/back: (x: string) => number) {
////        call/*6*/back('hi');
////        callback('bye');
////        var hm = "hm";
////        callback(hm);
////    }
////}

////var c: C;
////c.x/*7*/1(1, (x/*8*/x: 'hi') => { return 1; } );
////c.x1(1, (x/*9*/x: 'bye') => { return 1; } );
////c.x1(1, (x/*10*/x) => { return 1; } );

verify.quickInfos({
    1: "(method) I.x1(a: number, callback: (x: 'hi') => number): any",
    2: "(method) C.x1(a: number, callback: (x: 'hi') => number): any",
    3: "(parameter) callback: (x: 'hi') => number",
    4: "(method) C.x1(a: number, callback: (x: \"hi\") => number): any",
    5: "(parameter) callback: (x: string) => number",
    6: "(parameter) callback: (x: string) => number",
    7: "(method) C.x1(a: number, callback: (x: 'hi') => number): any",
    8: "(parameter) xx: \"hi\"",
    9: "(parameter) xx: \"bye\"",
    10: "(parameter) xx: \"hi\""
});
