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
////const c = a + b;
////const t = 9;

// @Filename: /tsconfig.json
////{ "files": ["file1.ts", "file2.ts", "target.ts"] }

const range = test.ranges();
format.setOption("insertSpaceAfterSemicolonInForStatements", true);
verify.postPasteImportFixes({
    pastes: [{
        text: `const c = a + b;
const t = 9;`,
        range: range[0],
    }],
    copySpan: { file:"file2.ts", start: { line : 2, offset: 0}, end : { line: 3, offset: 0}},
    newFileContents: {
        "/file2.ts":
`import { b } from './file1';
export const a = 1;
const c = a + b;
const t = 9;`,

        "/target.ts": 
`import { a } from "./file2";

import { b } from './file1';

export const tt = 2;
const c = a + b;
const t = 9;
const p = 1;`,
    }
});
