/// <reference path="fourslash.ts"/>

////class Foo {
////    doStuff(): number { return 0; }
////    static staticMethod() {}
////}
////module Foo {
////    export var x: number;
////}
////Foo/*c1*/; // should get "x", "prototype"
////var s: Foo/*c2*/; // should get "x" and "prototype"
////var f = new Foo();
////f/*c3*/;

// this line triggers a semantic/syntactic error check, remove line when 788570 is fixed
edit.insert('');

goTo.marker("c1");
edit.insert(".");
verify.memberListContains("x");
verify.memberListContains("prototype");
verify.memberListContains("staticMethod");

goTo.marker("c2");
edit.insert(".");
verify.memberListContains("x");
verify.memberListContains("staticMethod");
verify.memberListContains("prototype");

goTo.marker("c3");
edit.insert(".");
verify.memberListContains("doStuff");
verify.memberListCount(1);
