/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////namespace N { export const x = 0; }
////[|import M = N;
////export import O = N;|]
////M;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`export namespace N { export const x = 0; }
import M = N;
M;`,

        "/O.ts":
`import { N } from "./a";
export import O = N;
`,
    },
});
