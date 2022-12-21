/// <reference path="fourslash.ts" />

////interface Foo {
////    one: string;
////    two: number;
////}
////
////interface Bar<T extends Foo> {
////    foo: T;
////}
////
////var foobar: Bar<{ on/**/

verify.completions({ marker: "", exact: ["one", "two"], isNewIdentifierLocation: true });
