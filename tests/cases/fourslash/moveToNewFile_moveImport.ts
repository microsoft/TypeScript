/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|import { a, b } from "m";
////a;|]
////b;

//verify.noMoveToNewFile();
verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`b;`,
        "/newFile.ts":
`import { a } from "m";
import { a, b } from "m";
a;`,
    }
});
