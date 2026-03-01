/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import { y } from "./a";

// @Filename: /a.ts
////[|export const y = 1;|]

verify.moveToFile({
    newFileContents: {
        "/a.ts": "",

        "/bar.ts": 
`
export const y = 1;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});
