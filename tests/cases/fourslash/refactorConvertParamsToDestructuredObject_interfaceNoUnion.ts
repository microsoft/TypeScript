/// <reference path='fourslash.ts' />

////interface IFoo {
////    method(x: string, y: string): void;
////}
////interface IBar {
////    method(x: number): void;
////}
////const x: IFoo | IBar = {
////    method(/*a*/x: string, y: string/*b*/): void {},
////};

goTo.select("a", "b");
verify.not.refactorAvailable("Convert parameters to destructured object");
