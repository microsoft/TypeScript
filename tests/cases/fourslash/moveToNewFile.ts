/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////import { a, b } from "./other";
////const p = 0;
////[|const y = p + b;|]
////y;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { y } from "./y";

import { a } from "./other";
export const p = 0;
y;`,

        "/y.ts":
`import { b } from "./other";
import { p } from "./a";
export const y = p + b;`,
    },
});
