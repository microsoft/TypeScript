/// <reference path='fourslash.ts' />

// @experimentalDecorators: true

// @Filename: /a.ts
////const decorator1: any = () => {};
////const decorator2: any = () => {};
////[|class Foo {
////    @decorator1 method1() { }
////    @decorator1 @decorator2 method2() { }
////}|]

verify.noErrors();

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`const decorator1: any = () => {};
const decorator2: any = () => {};
`,
        "/Foo.ts":
`class Foo {
    @decorator1 method1() { }
    @decorator1 @decorator2 method2() { }
}
`
    }
});
