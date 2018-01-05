/// <reference path='fourslash.ts'/>

////class A<T> {
////    static B<S>(v: A<S>): A<S>;
////    static B<S>(v: S): A<S>;
////    static B<S>(v: any): A<S> {
////        return null;
////    }
////}

////var a = new A<number>();
////A.B(/**/

goTo.marker();
verify.signatureHelpCountIs(2);
edit.insert('a');
verify.signatureHelpCountIs(2);
// verify.currentSignatureHelpIs('B(v: A<number>): A<number>')
edit.insert('); A.B(');
verify.currentSignatureHelpIs('B(v: A<{}>): A<{}>');
edit.insert('a');
// verify.currentSignatureHelpIs('B(v: A<number>): A<number>')
