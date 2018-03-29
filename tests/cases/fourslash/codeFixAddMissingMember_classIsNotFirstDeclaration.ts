/// <reference path='fourslash.ts' />

////interface C {}
////class C {
////}
////new C().x = 0;

verify.codeFix({
    description: "Declare property 'foo'",
    index: 0,
    newFileContent: `class C {
    foo: number;
    method() {
        this.foo = 10;
    }
}`
});
