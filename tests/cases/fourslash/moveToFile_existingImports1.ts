/// <reference path='fourslash.ts' />

// @filename: /common.ts
////export const x = 1;
////export const y = 2;

// @filename: /a.ts
////export const t = 1;
////export const z = 2;
////const x = 3;
////export const q = 0;
////[|export const bar = z + x + q;|]

// @filename: /b.ts
////import { t, z } from "./a";
////import { y } from "./common";
////export const foo = t;

verify.moveToFile({
    newFileContents: {
        "/a.ts": `export const t = 1;
export const z = 2;
export const x = 3;
export const q = 0;
`,
        "/b.ts":
`import { q, t, x, z } from "./a";
import { y } from "./common";
export const foo = t;
export const bar = z + x + q;
`,
    },
    interactiveRefactorArguments: { targetFile: "/b.ts" },
});
