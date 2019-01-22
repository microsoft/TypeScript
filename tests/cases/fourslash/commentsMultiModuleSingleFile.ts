/// <reference path='fourslash.ts' />

/////** this is multi declare namespace*/
////namespace mult/*3*/iM {
////    /** class b*/
////    export class b {
////    }
////}
/////** thi is multi namespace 2*/
////namespace mu/*2*/ltiM {
////    /** class c comment*/
////    export class c {
////    }
////}
////
////new /*1*/mu/*4*/ltiM.b();
////new mu/*5*/ltiM.c();

const comment = "this is multi declare namespace\nthi is multi namespace 2";

verify.completions({ marker: "1", includes: { name: "multiM", text: "namespace multiM", documentation: comment } });

for (const marker of ["2", "3", "4", "5"]) {
    verify.quickInfoAt(marker, "namespace multiM", comment);
}
