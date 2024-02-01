/// <reference path="../fourslash.ts" />

// @Filename: /file1.ts
////export const b = 2;

// @Filename: /file2.ts
////import { b } from './file1';
////const a = 1;
////const c = a + b;
////const t = 9;

// @Filename: /target.ts
//// /*a*/export const tt = 2;/*b*/
//// function f();
//// const p = 1;

// @Filename: /tsconfig.json
////{ "files": ["file1.ts", "file2.ts", "target.ts"] }

goTo.select("a", "b");
format.setOption("insertSpaceAfterSemicolonInForStatements", true);
verify.postPasteImportFix({
    targetFile: "target.ts", 
    pastes: [{
        text: `const c = a + b;
const t = 9;`,
        range: { pos: 21, end: 34 },
    }],
    originalFile: "file2.ts",
    copyRange: { start: { line : 2, offset: 0}, end : { line: 3, offset: 0}},
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