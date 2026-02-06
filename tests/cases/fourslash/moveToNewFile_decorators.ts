/// <reference path='fourslash.ts' />

// @experimentalDecorators: true

// @Filename: /a.ts
////const decorator1: any = () => {};
////const decorator2: any = () => {};
////[|class Foo {
////    constructor(@decorator1 private readonly x: number,
////        @decorator1 @decorator2 private readonly y: number) { }
////
////    method1(@decorator1 x: number) { }
////    method2(@decorator1 @decorator2 x: number) { }
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

class Foo {
    constructor(@decorator1 private readonly x: number,
        @decorator1 @decorator2 private readonly y: number) { }

    method1(@decorator1 x: number) { }
    method2(@decorator1 @decorator2 x: number) { }
}
`
    }
});
