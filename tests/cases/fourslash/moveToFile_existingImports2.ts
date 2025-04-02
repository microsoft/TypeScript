/// <reference path='fourslash.ts' />

// @filename: /common.ts
////export const x = 1;

// @filename: /a.ts
////import { x } from "./common";
////export const a = x;
////[|export const b = x;|]

// @filename: /b.ts
////import { x } from "./common";
////export const a = x;

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`import { x } from "./common";
export const a = x;
`,
        "/b.ts":
`import { x } from "./common";
export const a = x;
export const b = x;
`,
    },
    interactiveRefactorArguments: { targetFile: "/b.ts" },
});
