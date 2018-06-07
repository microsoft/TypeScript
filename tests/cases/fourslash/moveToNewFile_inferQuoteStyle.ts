/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////import 'unrelated';
////
////[|const x = 0;|]
////x;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { x } from './x';

import 'unrelated';

x;`,

        "/x.ts":
`export const x = 0;`,
    },
});
