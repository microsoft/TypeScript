/// <reference path='fourslash.ts' />

////interface IFoo {
////    method(x: string, y: string): void;
////    method(x: number, y: string): void;
////}
////const x: IFoo = {
////    method(/*a*/x: string | number, y: string/*b*/): void {},
////};

// For multiple signatures, we don't have a reliable way to determine
// which signature to match to or if all signatures should be changed.
goTo.select("a", "b");
verify.not.refactorAvailable("Convert parameters to destructured object");
