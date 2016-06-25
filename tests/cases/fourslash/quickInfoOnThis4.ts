/// <reference path='fourslash.ts' />
////interface ContextualInterface {
////    m: number;
////    method(this: this, n: number);
////}
////let o: ContextualInterface = {
////    m: 12,
////    method(n) {
////        let x = this/*1*/.m;
////    }
////}
////interface ContextualInterface2 {
////    (this: void, n: number): void;
////}
////let contextualInterface2: ContextualInterface2 = function (th/*2*/is, n) { }

goTo.marker('1');
verify.quickInfoIs('this: ContextualInterface');
goTo.marker('2');
verify.quickInfoIs('(parameter) this: void');
