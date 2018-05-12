/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////import { a, b, alreadyUnused } from "./other";
////const p = 0;
////[|const y = p + b;|]
////a; y;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { y } from "./y";

import { a, alreadyUnused } from "./other";
export const p = 0;
a; y;`,

        "/y.ts":
`import { b } from "./other";
import { p } from "./a";
export const y = p + b;`,
    },
});
