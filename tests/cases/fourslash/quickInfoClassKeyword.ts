/// <reference path='fourslash.ts'/>

////[1].forEach(cla/*1*/ss {});
////[1].forEach(cla/*2*/ss OK{});

verify.quickInfoAt("1", "(local class) (Anonymous class)");
verify.quickInfoAt("2", "(local class) OK");

