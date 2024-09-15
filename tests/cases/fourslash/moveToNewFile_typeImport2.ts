/// <reference path="fourslash.ts" />

// @filename: /a.ts
////export interface A {
////    x: number;
////}

// @Filename: /b.ts
////import { type A } from "./a";
////[|function f(a: A) {}|]

verify.moveToNewFile({
    newFileContents: {
        "/b.ts": "",
        "/f.ts":
`import type { A } from "./a";

function f(a: A) { }
`,
    },
});
