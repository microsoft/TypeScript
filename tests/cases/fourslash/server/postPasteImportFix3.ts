/// <reference path="../fourslash.ts" />

// @Filename: /file1.ts
////export const b = 2;

// @Filename: /file2.ts
////import { b } from './file1';
////const a = 1;
////const c = a + b;
////const t = 9;

// @Filename: /file3.ts
//// /*a*/export const tt = 2;/*b*/
//// function f();

// @Filename: /tsconfig.json
////{ "files": ["file1.ts", "file2.ts", "file3.ts"] }

goTo.select("a", "b");
format.setOption("insertSpaceAfterSemicolonInForStatements", true);
verify.postPasteImportFix({
    targetFile: "file3.ts", 
    pastes: [{
        text: `export const tt = 2;
        const c = a + b;
        const t = 9;
        function f();`,
        range: { pos: 20, end: 22 },
    }],
    originalFile: "file2.ts",
    copyRange: { start: { line : 2, offset: 0}, end : { line: 3, offset: 0}},
    newFileContents: {
        "/file2.ts":
`import { b } from './file1';
export const a = 1;
const c = a + b;
const t = 9;`,

        "/file3.ts": 
`import { a } from "./file2";

import { b } from './file1';

export const tt = 2;
function f();
const c = a + b;
const t = 9;

`,
    }
});