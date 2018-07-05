/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|import { a, b } from "m";
////let l;
////a;|]
////b;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { b } from "m";
b;`,
        "/l.ts":
`import { a } from "m";
let l;
a;`,
    }
});
