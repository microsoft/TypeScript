/// <reference path='fourslash.ts'/>

////class c/*1*/5b { public foo() { } }
////namespace c/*2*/5b { export var y = 2; } // should be ok
/////*3*/

verify.quickInfos({
    1: "class c5b\nnamespace c5b",
    2: "class c5b\nnamespace c5b"
});

goTo.marker('3');
verify.completionListContains("c5b", "class c5b\nnamespace c5b");