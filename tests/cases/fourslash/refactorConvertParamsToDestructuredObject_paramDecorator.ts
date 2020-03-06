/// <reference path='fourslash.ts' />

////declare function required(target: Object, propertyKey: string | symbol, parameterIndex: number)
////class C {
////    /*a*/bar/*b*/(@required a: number, b: number) {
////
////    }
////}

goTo.select("a", "b");
verify.not.refactorAvailable("Convert parameters to destructured object");