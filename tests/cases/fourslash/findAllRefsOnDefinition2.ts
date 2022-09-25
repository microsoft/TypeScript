/// <reference path="fourslash.ts" />

//@Filename: findAllRefsOnDefinition2-import.ts
////export module Test{
////
////    /*1*/export interface /*2*/start { }
////
////    export interface stop { }
////}

//@Filename: findAllRefsOnDefinition2.ts
////import Second = require("./findAllRefsOnDefinition2-import");
////
////var start: Second.Test./*3*/start;
////var stop: Second.Test.stop;

verify.baselineFindAllReferences('1', '2', '3');
