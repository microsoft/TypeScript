/// <reference path='fourslash.ts'/>

////class c/*1*/5b { public foo() { } }
////module c/*2*/5b { export var y = 2; } // should be ok
/////*3*/

goTo.marker('1');
verify.quickInfoIs("class c5b\nmodule c5b");

goTo.marker('2');
verify.quickInfoIs("class c5b\nmodule c5b");

goTo.marker('3');
verify.completionListContains("c5b", "class c5b\nmodule c5b");