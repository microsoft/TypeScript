/// <reference path='fourslash.ts' />

// @Filename: commentsMultiModuleMultiFile_0.ts
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

// @Filename: commentsMultiModuleMultiFile_1.ts
/////** this is multi namespace 3 comment*/
////namespace mu/*6*/ltiM {
////    /** class d comment*/
////    export class d {
////    }
////}
////new /*7*/mu/*8*/ltiM.d();

const comment = "this is multi declare namespace\nthi is multi namespace 2\nthis is multi namespace 3 comment";

verify.completions({
    marker: ["1", "7"],
    includes: { name: "multiM", text: "namespace multiM", documentation: comment },
});

for (const marker of ["2", "3", "4", "5", "6", "8"]) {
    verify.quickInfoAt(marker, "namespace multiM", comment);
}
