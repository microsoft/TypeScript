/// <reference path="fourslash.ts" />

////interface Foo {
////    one: string;
////    two: number;
////    333: symbol;
////    '4four': boolean;
////    '5 five': object;
////    number: string;
////    Object: number;
////}
////
////interface Bar<T extends Foo> {
////    foo: T;
////}
////
////var foobar: Bar<{/**/

verify.completions({
    marker: "",
    unsorted: ["one", "two", "\"333\"", "\"4four\"", "\"5 five\"", "number", "Object"],
    isNewIdentifierLocation: true
});
