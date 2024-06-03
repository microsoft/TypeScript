/// <reference path="../fourslash.ts" />

// @Filename: /target.ts
//// export const tt = 2;
//// [|function f();|]
//// const p = 1;

// @Filename: /file1.ts
////export const b = 2;

// @Filename: /file2.ts
////import { b } from './file1';
////const a = 1;
////[|const c = a + b;
////const t = 9;|]

// @Filename: /tsconfig.json
////{ "files": ["file1.ts", "file2.ts", "target.ts"] }

const range = test.ranges();
const t = range[0];
verify.pasteEdits({ 
    args: {
        pastedText: [ `const c = a + b;
const t = 9;`],
    pasteLocations: [range[0]],
    copiedFrom: { file: "file2.ts", range: [range[1]] },
    },
    newFileContents: {
        "/file2.ts":
`import { b } from './file1';
export const a = 1;
const c = a + b;
const t = 9;`,

        "/target.ts": 
`import { b } from './file1';
import { a } from './file2';

export const tt = 2;
const c = a + b;
const t = 9;
const p = 1;`,
    }
});
