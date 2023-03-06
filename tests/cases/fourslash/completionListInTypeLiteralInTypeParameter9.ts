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
////        three: { five:/*g*/ } & {/*4*/},
////    }
////}>;

verify.completions({ marker: "g", includes: ["Foo", "Bar", ...completion.globalTypes] });
verify.completions({ marker: "4", exact: "four", isNewIdentifierLocation: true });

