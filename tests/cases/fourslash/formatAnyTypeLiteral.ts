/// <reference path="fourslash.ts"/>
//// function foo(x: { } /*objLit*/){
//// /**/

goTo.marker();
edit.insert("}");
goTo.marker("objLit");
verify.currentLineContentIs("function foo(x: {}) {"); // Space within type literal removed
