/// <reference path='fourslash.ts' />

// @target: esnext
// @module: esnext
// @Filename: /a.ts
////[|const x = 0;
////export default x;|]
////
// @Filename: /b.ts
////export { B, default as default, C } from "./a";
////

verify.moveToNewFile({
    newFileContents: {
        "/a.ts": "",
        "/x.ts":
            `const x = 0;
export default x;
`,
        "/b.ts":
            `export { B, C } from "./a";
export { default as default } from "./x";
`,
    }
})
