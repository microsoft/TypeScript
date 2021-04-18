/// <reference path="fourslash.ts" />

////interface Foo {
////    one: string;
////    two: {
////        three: number;
////    }
////}
////
////interface Bar<T extends Foo> {
////    foo: T;
////}
////
////var foobar: Bar<{
////    two: {/**/

verify.completions({ marker: "", exact: "three", isNewIdentifierLocation: true });
