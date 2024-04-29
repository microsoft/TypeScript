/// <reference path='fourslash.ts' />

// @filename: /common.ts
////export const x = 1;

// @filename: /a.ts
////import { x } from "./common";
////[|export const bar = x;|]

// @filename: /b.ts
////import { x } from "./common";
////export const foo = x;

verify.moveToFile({
    newFileContents: {
        "/a.ts": "",
        "/b.ts":
`import { x } from "./common";
export const foo = x;
export const bar = x;
`,
    },
    interactiveRefactorArguments: { targetFile: "/b.ts" },
});