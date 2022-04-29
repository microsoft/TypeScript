/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////import 'unrelated';
////
////[|const x = 0;|]
////x;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import 'unrelated';
import { x } from './x';

x;`,

        "/x.ts":
`export const x = 0;
`,
    },
});
