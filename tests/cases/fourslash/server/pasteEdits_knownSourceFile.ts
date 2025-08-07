/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/target.ts
//// export const tt = 2;
//// [|function f();|]
//// const p = 1;

// @Filename: /home/src/workspaces/project/file1.ts
////export const b = 2;

// @Filename: /home/src/workspaces/project/file2.ts
////import { b } from './file1';
////const a = 1;
////[|const c = a + b;
////const t = 9;|]

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["file1.ts", "file2.ts", "target.ts"] }

const ranges = test.ranges();
verify.pasteEdits({ 
    args: {
        pastedText: [ `const c = a + b;
const t = 9;`],
    pasteLocations: [ranges[0]],
    copiedFrom: { file: "/home/src/workspaces/project/file2.ts", range: [ranges[1]] },
    },
    newFileContents: {
        "/home/src/workspaces/project/file2.ts":
`import { b } from './file1';
export const a = 1;
const c = a + b;
const t = 9;`,

        "/home/src/workspaces/project/target.ts": 
`import { b } from './file1';
import { a } from './file2';

export const tt = 2;
const c = a + b;
const t = 9;
const p = 1;`,
    }
});
