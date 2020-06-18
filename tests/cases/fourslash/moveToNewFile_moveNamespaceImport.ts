/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////import * as o from './other';
////[|export const x = o.foo();|]
////export const a = 0;

verify.moveToNewFile({
    newFileContents: {
"/a.ts":
`export const a = 0;`,

"/x.ts":
`import * as o from './other';
export const x = o.foo();
`
    },
});
