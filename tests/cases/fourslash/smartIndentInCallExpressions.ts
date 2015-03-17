/// <reference path='fourslash.ts'/>

////module My.App {
////    export var appModule = angular.module("app", [
////    ]).config([() => {
////        configureStates/*1*/($stateProvider);
////    }]).run(My.App.setup);
////}

goTo.marker("1")
edit.insert("\n");
verify.indentationIs(12); // 4 (module block) + 4 (function block) + 4 (call expression)