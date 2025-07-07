/// <reference path="fourslash.ts" />

////const a = 1;
////
////export const enum E {
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
    Foo
}

const foo = E.Foo;`,
});
