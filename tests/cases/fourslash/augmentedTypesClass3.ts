/// <reference path='fourslash.ts'/>

////class c/*1*/5b { public foo() { } }
////namespace c/*2*/5b { export var y = 2; } // should be ok
/////*3*/

verify.quickInfos({
    1: "class c5b\nnamespace c5b",
    2: "class c5b\nnamespace c5b"
});
verify.completions({ marker: "3", includes: { name: "c5b", text: "class c5b\nnamespace c5b" }})
