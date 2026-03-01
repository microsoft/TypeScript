/// <reference path='fourslash.ts' />

// @module: esnext

// @filename: /a.ts
////export interface A {}

// @filename: /b.ts
////export * as A from "./a";
////export type B = string

// @filename: /c.ts
////import { A } from "./b"
////[|type B = A.B|]

verify.moveToNewFile({
    newFileContents: {
        "/c.ts": '',
        "/B.1.ts":
`import { A } from "./a";

type B = A.B;
`,
    },
});