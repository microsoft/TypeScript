///<reference path="fourslash.ts"/>

////class Foo {
////    async     foo() {}
////}

format.document();
verify.currentFileContentIs(
`class Foo {
    async foo() { }
}`
);
