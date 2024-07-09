/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////import 'unrelated';
////
////[|export const x = 0;|]
////x;
// @Filename: /b.ts
////import { x } from './a'
////
////x;
// @Filename: /c.ts
//////The same import, but namespace variant
////import * as A from './a'
////
////A.x;

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import 'unrelated';
import { x } from './x';

x;`,

        "/x.ts":
`
export const x = 0;
`,
        "/b.ts":
            `import { x } from './x';

x;`,
        "/c.ts":
            `//The same import, but namespace variant
import * as A from './a'
import * as x from './x';

x.x;`
    },
});
