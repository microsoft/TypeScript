/// <reference path='fourslash.ts'/>

// Global variable reference.

////var /*1*/topLevelVar = 2;
////var topLevelVar2 = topLevelVar;
////
////class /*2*/topLevelClass { }
////var c = new topLevelClass();
////
////interface topLevelInterface { }
////var i: /*3*/topLevelInterface;
////
////module topLevelModule {
////    export var x;
////}
////var x = /*4*/topLevelModule.x;
////
////export = x;

test.markers().forEach(m => {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(2);
});