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
////    var r/*2*/4 = b.b/*1*/ar; // string
////}

diagnostics.setEditValidation(IncrementalEditValidation.None);

goTo.marker('1');
verify.quickInfoIs("(property) B<T>.bar: string", undefined);
edit.deleteAtCaret(1);
edit.insert('z');
verify.not.quickInfoExists();
verify.numberOfErrorsInCurrentFile(1);
edit.backspace(1);
edit.insert('a');
verify.quickInfoIs("(property) B<T>.bar: string", undefined);
goTo.marker('2');
verify.quickInfoIs("(var) r4: string", undefined);
verify.numberOfErrorsInCurrentFile(0);
