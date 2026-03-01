/// <reference path="fourslash.ts" />

////const a = 1;
////
////export const enum E {
////    A = 0,
////    B = 1,
////}
////
////const foo = E.Foo/**/;

goTo.marker("");
verify.codeFix({
    index: 0,
    description: "Add missing enum member 'Foo'",
    newFileContent:
`const a = 1;

export const enum E {
    A = 0,
    B = 1,
    Foo,
}

const foo = E.Foo;`,
});
