/// <reference path='fourslash.ts' />

// @experimentalDecorators: true

// @Filename: /a.ts
////const decorator1: any = () => {};
////const decorator2: any = () => {};
////[|@decorator1 @decorator2 class Foo {
////}|]

verify.noErrors();

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`const decorator1: any = () => {};
const decorator2: any = () => {};
`,
        "/Foo.ts":
`@decorator1 @decorator2 class Foo {
}
`
    }
});
