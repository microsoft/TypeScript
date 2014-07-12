/// <reference path='fourslash.ts' />

// @Filename: commentsMultiModuleMultiFile_0.ts
/////** this is multi declare module*/
////module mult/*3*/iM {
////    /** class b*/
////    export class b {
////    }
////}
/////** thi is multi module 2*/
////module mu/*2*/ltiM {
////    /** class c comment*/
////    export class c {
////    }
////}
////
////new /*1*/mu/*4*/ltiM.b();
////new mu/*5*/ltiM.c();

// @Filename: commentsMultiModuleMultiFile_1.ts
/////** this is multi module 3 comment*/
////module mu/*6*/ltiM {
////    /** class d comment*/
////    export class d {
////    }
////}
////new /*7*/mu/*8*/ltiM.d();

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker('1');
verify.completionListContains("multiM", "multiM", "this is multi declare module\nthi is multi module 2\nthis is multi module 3 comment", "multiM", "module");

goTo.marker('2');
verify.quickInfoIs("multiM", "this is multi declare module\nthi is multi module 2\nthis is multi module 3 comment", "multiM", "module");

goTo.marker('3');
verify.quickInfoIs("multiM", "this is multi declare module\nthi is multi module 2\nthis is multi module 3 comment", "multiM", "module");

goTo.marker('4');
verify.quickInfoIs("typeof multiM", "this is multi declare module\nthi is multi module 2\nthis is multi module 3 comment", "multiM", "module");

goTo.marker('5');
verify.quickInfoIs("typeof multiM", "this is multi declare module\nthi is multi module 2\nthis is multi module 3 comment", "multiM", "module");

goTo.marker('6');
verify.quickInfoIs("multiM", "this is multi declare module\nthi is multi module 2\nthis is multi module 3 comment", "multiM", "module");

goTo.marker('7');
verify.completionListContains("multiM");

goTo.marker('8');
verify.quickInfoIs("typeof multiM", "this is multi declare module\nthi is multi module 2\nthis is multi module 3 comment", "multiM", "module");