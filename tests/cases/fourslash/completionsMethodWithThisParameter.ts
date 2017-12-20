/// <reference path='fourslash.ts'/>

////class A<T> {
////    value: T; // Make the type parameter actually matter
////    ms(this: A<string>) {}
////    mo(this: A<{}>) {}
////}
////
////const s = new A<string>();
////const n = new A<number>();
////s./*s*/;
////n./*n*/;

verify.completionsAt("s", ["value", "ms", "mo"]);
verify.completionsAt("n", ["value", "mo"]);