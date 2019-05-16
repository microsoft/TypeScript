/// <reference path='fourslash.ts' />

//// class C {
////     m<T>(): /*a*/T | this | number/*b*/ {
////         return {} as any
////     }
//// }

goTo.select("a", "b");
verify.not.refactorAvailable("Extract type")
