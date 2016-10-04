/// <reference path='fourslash.ts'/>

/////// <reference path="/*1*/..\services\services.ts" /> // no globals in reference paths
////import { /*2*/ } from "./file.ts";  // no globals in imports
////var test = "/*3*/"; // no globals in strings
/////*4*/class A { // insert globals
////    foo(): string { return ''; }
////}
////
////class /*5*/B extends A { // no globals after class keyword
////    bar(): string {
//// /*6*/ // insert globals
////        return '';
////    }
////}
////
////class C</*7*/ U extends A, T extends A> { // no globals at beginning of generics
////    x: U;
////    y = this./*8*/x; // no globals inserted for member completions
////   /*9*/ // insert globals
////}
/////*10*/ // insert globals
goTo.marker("1");
verify.completionListIsGlobal(false);
goTo.marker("2");
verify.completionListIsGlobal(false);
goTo.marker("3");
verify.completionListIsGlobal(false);
goTo.marker("4");
verify.completionListIsGlobal(true);
goTo.marker("5");
verify.completionListIsGlobal(false);
goTo.marker("6");
verify.completionListIsGlobal(true);
goTo.marker("7");
verify.completionListIsGlobal(false);
goTo.marker("8");
verify.completionListIsGlobal(false);
goTo.marker("9");
verify.completionListIsGlobal(true);
goTo.marker("10");
verify.completionListIsGlobal(true);
