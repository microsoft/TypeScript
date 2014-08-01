/// <reference path='fourslash.ts'/>

////module M {
////    interface A<T> {
////        (): string;
////        (x: T): T;
////    }
////    interface A<T> {
////        (x: T, y: number): T;
////        <U>(x: U, y: T): U;
////    }
////    var a: A<boolean>;
////    var r = a();
////    var r2 = a(true);
////    var r3 = a(true, 2);
////    var /*1*/r4 = a(1, true);
////}

diagnostics.setEditValidation(IncrementalEditValidation.None);

goTo.marker('1');
verify.quickInfoIs("number", undefined, "r4", "var");
