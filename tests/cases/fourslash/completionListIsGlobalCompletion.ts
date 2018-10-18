/// <reference path='fourslash.ts'/>

// @Filename: file.ts
////export var x = 10;
////export var y = 10;
////export default class C {
////}

// @Filename: a.ts
////import { /*1*/ } from "./file.ts";  // no globals in imports - export found

//@Filename: file.tsx
/////// <reference path="/*2*/..\services\services.ts" /> // no globals in reference paths
////import { /*3*/ } from "./file1.ts";  // no globals in imports - export not found
////var test = "/*4*/"; // no globals in strings
/////*5*/class A { // insert globals
////    foo(): string { return ''; }
////}
////
////class /*6*/B extends A { // no globals after class keyword
////    bar(): string {
//// /*7*/ // insert globals
////        return '';
////    }
////}
////
////class C</*8*/ U extends A, T extends A> { // no globals at beginning of generics
////    x: U;
////    y = this./*9*/x; // no globals inserted for member completions
////   /*10*/ // insert globals
////}
/////*11*/ // insert globals
////const y = <div /*12*/ />; // no globals in jsx attribute found
////const z = <div =/*13*/ />; // no globals in jsx attribute with syntax error
////const x = `/*14*/ ${/*15*/}`; // globals only in template expression
////var user = </*16*/User name=/*17*/{ /*18*/window.isLoggedIn ? window.name : '/*19*/'} />; // globals only in JSX expression (but not in JSX expression strings)
goTo.marker("1");
verify.completionListIsGlobal(false);
goTo.marker("2");
verify.completionListIsGlobal(false);
goTo.marker("3");
verify.completionListIsGlobal(false);
goTo.marker("4");
verify.completionListIsGlobal(false);
goTo.marker("5");
verify.completionListIsGlobal(true);
goTo.marker("6");
verify.completionListIsGlobal(false);
goTo.marker("7");
verify.completionListIsGlobal(true);
goTo.marker("8");
verify.completionListIsGlobal(false);
goTo.marker("9");
verify.completionListIsGlobal(false);
goTo.marker("10");
verify.completionListIsGlobal(false);
goTo.marker("11");
verify.completionListIsGlobal(true);
goTo.marker("12");
verify.completionListIsGlobal(false);
goTo.marker("13");
verify.completionListIsGlobal(false);
goTo.marker("14");
verify.completionListIsGlobal(false);
goTo.marker("15");
verify.completionListIsGlobal(true);
goTo.marker("16");
verify.completionListIsGlobal(false);
goTo.marker("17");
verify.completionListIsGlobal(false);
goTo.marker("18");
verify.completionListIsGlobal(true);
goTo.marker("19");
verify.completionListIsGlobal(false);