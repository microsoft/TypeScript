/// <reference path='fourslash.ts'/>

////module MM {
////    interface B<T> {
////        foo: number;
////    }
////    interface B<T> {
////        bar: string;
////    }
////    var b: B<string>;
////    var r3 = b.foo; // number
////    var r/*2*/4 = b.ba/*1*/r; // string
////}

diagnostics.setEditValidation(IncrementalEditValidation.None);

goTo.marker('1');
verify.quickInfoIs("string", undefined, "MM.B<T>.bar", "property");
edit.deleteAtCaret(1);
edit.insert('z');
verify.quickInfoIs("any");
verify.numberOfErrorsInCurrentFile(1);
edit.backspace(1);
edit.insert('r');
verify.quickInfoIs("string", undefined, "MM.B<T>.bar", "property");
goTo.marker('2');
verify.quickInfoIs("string", undefined, "r4", "var");
verify.numberOfErrorsInCurrentFile(0);
