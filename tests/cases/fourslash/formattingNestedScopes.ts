/// <reference path='fourslash.ts'/>

/////*1*/        module      My.App      {
/////*2*/export      var appModule =      angular.module("app", [
/////*3*/            ]).config([() =>            {
/////*4*/                        configureStates
/////*5*/($stateProvider);
/////*6*/}]).run(My.App.setup);
/////*7*/      }


format.document()

goTo.marker("1");
verify.currentLineContentIs("module My.App {");
goTo.marker("2");
verify.currentLineContentIs("    export var appModule = angular.module(\"app\", [");
goTo.marker("3");
verify.currentLineContentIs("    ]).config([() => {");
goTo.marker("4");
verify.currentLineContentIs("        configureStates");
goTo.marker("5");
verify.currentLineContentIs("            ($stateProvider);");
goTo.marker("6");
verify.currentLineContentIs("    }]).run(My.App.setup);");
goTo.marker("7");
verify.currentLineContentIs("}");