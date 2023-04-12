/// <reference path='fourslash.ts' />

// @Filename: /bar.ts
////const a = 1;

// @Filename: /a.ts
////import { a } from 'doesnt-exist';
////[|a();|]

verify.moveToFile({
    newFileContents: {
        "/a.ts":
``,

        "/bar.ts":
`const a = 1;
a();
`,
    },
    newFile: "/bar.ts",
});