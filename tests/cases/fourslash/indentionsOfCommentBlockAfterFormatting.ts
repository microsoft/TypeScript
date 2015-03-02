/// <reference path='fourslash.ts' />

////// This is a test case of formatting.
////class TestClass {
////private foo: string;
////public bar: string;
////constructor(foo: string, bar: string) {
////this.foo = foo;
////this.bar = bar;
////}
/////** /*1*/
////* This document is to be formatted./*2*/
////*   /*3*/
////* After formatting, each line of this comment block should have indent consistent with the method./*4*/
////*
////  */
/////*5*/public testMethod() {
////}
////}
////var cookieMonster: TestClass;
////cookieMonster = new TestClass("FOO", "BAR");


format.document();
goTo.marker("1");
verify.indentationIs(4);
goTo.marker("2");
verify.indentationIs(4);
goTo.marker("3");
verify.indentationIs(4);
goTo.marker("4");
verify.indentationIs(4);
// Putting a marker in line "*" would bring some error when parsing code in automation.
// So move right by 1 offset from marker 4 to locate the caret in this line.
edit.moveRight(1);
verify.indentationIs(4);
// Putting a marker in line "  */" would bring some error when parsing code in automation.
// So move left by 1 offset from marker 5 to locate the caret in this line.
goTo.marker("5");
edit.moveLeft(1);
verify.indentationIs(4);
goTo.marker("5");
verify.indentationIs(4);