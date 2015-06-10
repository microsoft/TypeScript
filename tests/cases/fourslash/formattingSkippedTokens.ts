/// <reference path='fourslash.ts' />

/////*1*/foo(): Bar { }
/////*2*/function Foo      () #   { }
/////*3*/4+:5
//// module M {
////function a(
/////*4*/    : T) { }
////}
/////*5*/var x       =
format.document();
goTo.marker('1');
verify.currentLineContentIs('foo(): Bar { }');
goTo.marker('2');
verify.currentLineContentIs('function Foo() #   { }');
goTo.marker('3');
verify.currentLineContentIs('4 +:5');
goTo.marker('4');
verify.currentLineContentIs('    : T) { }');
goTo.marker('5');
verify.currentLineContentIs('var x =');
