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

verify.signatureHelp({ marker: "", overloadsCount: 2 });
edit.insert('a');
verify.signatureHelp({ overloadsCount: 2, text: "B(v: A<number>): A<number>" });
edit.insert('); A.B(');
verify.signatureHelp({ overloadsCount: 2, text: "B(v: A<unknown>): A<unknown>" });
edit.insert('a');
verify.signatureHelp({ overloadsCount: 2, text: "B(v: A<number>): A<number>" });
