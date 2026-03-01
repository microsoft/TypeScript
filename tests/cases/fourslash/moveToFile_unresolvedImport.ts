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
`import { a } from 'doesnt-exist';

const a = 1;
a();
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});