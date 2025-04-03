/// <reference path="fourslash.ts" />

//// type Foo = {
////   /** @ignore */
////   a: string;
////   b: number;
//// };
////
//// declare const foo: Foo;
//// foo./**/

verify.completions({
    marker: "",
    exact: "b",
    isNewIdentifierLocation: false,
});
