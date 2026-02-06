/// <reference path='fourslash.ts' />

// @experimentalDecorators: true

// @Filename: /a.ts
////const decorator1: any = () => {};
////[|@decorator1 class Foo {
////}|]

verify.noErrors();

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`export const decorator1: any = () => {};
`,
        "/Foo.ts":
`import { decorator1 } from "./a";

@decorator1 class Foo {
}
`
    }
});
