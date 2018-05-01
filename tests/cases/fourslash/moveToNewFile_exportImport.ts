/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////namespace N { export const x = 0; }
////[|import M = N;
////export import O = N;|]
////M;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { M } from "./M";

export namespace N { export const x = 0; }
M;`,

        "/M.ts":
`import { N } from "./a";
export import M = N;
export import O = N;`,
    },
});
