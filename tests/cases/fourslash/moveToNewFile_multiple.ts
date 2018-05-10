/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export {}; // make this a module
////const a = 0, b = 0;
////[|const x = 0;
////a;
////const y = 1;
////b;|]
////x; y;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { x, y } from "./x";

export {}; // make this a module
export const a = 0, b = 0;
x; y;`,

        "/x.ts":
`import { a, b } from "./a";
export const x = 0;
a;
export const y = 1;
b;`,
    },
});
