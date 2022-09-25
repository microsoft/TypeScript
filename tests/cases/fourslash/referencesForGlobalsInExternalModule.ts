/// <reference path='fourslash.ts'/>

// Global variable reference.

/////*1*/var /*2*/topLevelVar = 2;
////var topLevelVar2 = /*3*/topLevelVar;
////
/////*4*/class /*5*/topLevelClass { }
////var c = new /*6*/topLevelClass();
////
/////*7*/interface /*8*/topLevelInterface { }
////var i: /*9*/topLevelInterface;
////
/////*10*/module /*11*/topLevelModule {
////    export var x;
////}
////var x = /*12*/topLevelModule.x;
////
////export = x;

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
