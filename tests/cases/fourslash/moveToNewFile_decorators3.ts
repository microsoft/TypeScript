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
`export const decorator1: any = () => {};
export const decorator2: any = () => {};
`,
        "/Foo.ts":
`import { decorator1, decorator2 } from "./a";

@decorator1 @decorator2 class Foo {
}
`
    }
});
