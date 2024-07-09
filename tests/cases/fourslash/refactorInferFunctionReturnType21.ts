/// <reference path='fourslash.ts' />

////const f1 = /*a*//*b*/(x: number) => x;
////const f2 = (x: number) /*c*//*d*/=> x;
////const f3 = (x: number) => /*e*//*f*/x
////const f4= (x: number) => x/*g*//*h*/

goTo.select("a", "b");
verify.refactorAvailable("Infer function return type");

goTo.select("c", "d");
verify.not.refactorAvailable("Infer function return type");

goTo.select("e", "f");
verify.not.refactorAvailable("Infer function return type");

goTo.select("g", "h");
verify.not.refactorAvailable("Infer function return type");
