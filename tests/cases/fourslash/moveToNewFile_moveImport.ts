/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|import { a, b } from "m";
////a;|]
////b;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { b } from "m";
b;`,
        "/newFile.ts":
`import { a } from "m";
a;`,
    }
});
