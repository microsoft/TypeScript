/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export const x = 0;
////x;

// @Filename: /b.ts
////import { x } from './a'
////
////[|x|];


verify.moveToNewFile({
    newFileContents: {
        "/newFile.ts":
`import { x } from "./a";

x;
`,
        "/b.ts":
`
`
    },
});
