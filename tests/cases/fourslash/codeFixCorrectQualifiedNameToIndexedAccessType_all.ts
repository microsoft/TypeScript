/// <reference path='fourslash.ts' />

////interface Foo {
////    bar: string;
////}
////const x: Foo.bar = "";
////const y: Foo.bar = "";

verify.codeFixAll({
    actionId: "correctQualifiedNameToIndexedAccessType",
    newFileContent:
`interface Foo {
    bar: string;
}
const x: Foo["bar"] = "";
const y: Foo["bar"] = "";`,
});
