///<reference path="fourslash.ts"/>

////class Foo {
////    private    async     foo() {}
////}

format.document();
verify.currentFileContentIs(
`class Foo {
    private async foo() { }
}`
);
