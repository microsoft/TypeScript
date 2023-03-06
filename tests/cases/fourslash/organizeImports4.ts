/// <reference path="fourslash.ts" />

// Regression test for GH#43107

//// import * as something from "path";/** 
////  * some comment here
////  * and there
////  */
//// import * as somethingElse from "anotherpath";
//// import * as AnotherThing from "somepath";/** 
////  * some comment here
////  * and there
////  */
//// import * as AnotherThingElse from "someotherpath";

verify.organizeImports(''); 