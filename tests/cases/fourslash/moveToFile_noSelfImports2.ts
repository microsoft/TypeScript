/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import { y, z } from "./a";

// @Filename: /a.ts
////[|export const y = 1;|]
////export const z = 2;

verify.moveToFile({
    newFileContents: {
        "/a.ts": "export const z = 2;",

        "/bar.ts": 
`import { z } from "./a";
export const y = 1;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});
