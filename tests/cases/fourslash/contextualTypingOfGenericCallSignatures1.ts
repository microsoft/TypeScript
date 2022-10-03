/// <reference path='fourslash.ts'/>

////var f24: {
////   <T, U>(x: T): U
////};
////// x should not be contextually typed 
////var f24 = (/**/x) => { return 1 };

verify.quickInfoAt("", "(parameter) x: any");

