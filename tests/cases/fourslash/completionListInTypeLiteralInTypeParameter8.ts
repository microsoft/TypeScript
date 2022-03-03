/// <reference path="fourslash.ts" />

////interface Foo {
////    one: string;
////    two: {
////        three: {
////            four: number;
////            five: string;
////        }
////    }
////}
////
////interface Bar<T extends Foo> {
////    foo: T;
////}
////
////var foobar: Bar<{
////    two: {
////        three: {
////            five: string,
////            /*4*/
////        },
////        /*0*/
////    },
////    /*1*/
////}>;

verify.completions(
    { marker: "4", exact: "four", isNewIdentifierLocation: true },
    { marker: "0", exact: [], isNewIdentifierLocation: true },
    { marker: "1", exact: "one", isNewIdentifierLocation: true },
);

