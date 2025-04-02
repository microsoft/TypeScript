/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////const q = "test";

// @Filename: /a.ts
////const z = 1;
////[|const y = z + 2;|]
////const t = y + 1;

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`import { y } from "./bar";

export const z = 1;
const t = y + 1;`,

        "/bar.ts":
`import { z } from "./a";

const q = "test";
export const y = z + 2;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});
