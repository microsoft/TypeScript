/// <reference path="fourslash.ts" />

//@Filename: findAllRefsOnDefinition2-import.ts
////export module Test{
////
////    export interface /*1*/start { }
////
////    export interface stop { }
////}

//@Filename: findAllRefsOnDefinition2.ts
////import Second = require("findAllRefsOnDefinition2-import");
////
////var start: Second.Test.start;
////var stop: Second.Test.stop;

diagnostics.setEditValidation(IncrementalEditValidation.None);

goTo.file("findAllRefsOnDefinition2-import.ts");
goTo.marker("1");

verify.referencesCountIs(2);