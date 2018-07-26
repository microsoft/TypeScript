/// <reference path='fourslash.ts' />

//// type K = "foo" | "bar";
//// interface Foo { }
//// interface Bar<T> { bar: T; }
//// interface SomeType<T> extends Foo, Bar<T> {
////     a: number;
////     b: T;
////     readonly [prop: K]?: any;
//// }

verify.not.codeFixAvailable()
