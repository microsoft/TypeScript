/// <reference path='fourslash.ts' />
// @strict: true
//// 
//// declare function num(): number
//// const /*1*/Unit = num()
//// export type Unit = number
//// const value = /*2*/Unit
////
//// function Fn() {}
//// export type Fn = () => void
//// /*3*/Fn()

verify.quickInfoAt("1", "const Unit: number");
verify.quickInfoAt("2", "const Unit: number");

verify.quickInfoAt("3", "function Fn(): void");
