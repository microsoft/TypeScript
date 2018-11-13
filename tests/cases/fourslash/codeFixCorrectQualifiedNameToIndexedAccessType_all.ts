/// <reference path='fourslash.ts' />

////interface Foo {
////    bar: string;
////}
////const x: Foo.bar = "";
////const y: Foo.bar = "";

verify.codeFixAll({
    fixId: "correctQualifiedNameToIndexedAccessType",
    fixAllDescription: "Rewrite all as indexed access types",
    newFileContent:
`interface Foo {
    bar: string;
}
const x: Foo["bar"] = "";
const y: Foo["bar"] = "";`,
});
