/// <reference path='fourslash.ts' />

////function /*a*/f/*b*/(x: string): number;
////function f(x: string | number) {
////  return 1;
////}

goTo.select("a", "b");
verify.not.refactorAvailable("Infer function return type");
