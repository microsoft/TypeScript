/// <reference path='fourslash.ts'/>

////interface I {
////    <T>(x: T): void
////}
////function f6(x: <T extends I>(p: T) => void) { }
////// x should not be contextually typed so this should be an error
////f6(/**/x => x<number>())

verify.quickInfoAt("", "(parameter) x: T extends I");
verify.numberOfErrorsInCurrentFile(1);
