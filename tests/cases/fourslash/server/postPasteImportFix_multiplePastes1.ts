/// <reference path="../fourslash.ts" />

// @Filename: /file1.ts
//// export const p = 10;
//// export const q = 12;

// @Filename: /file3.ts
//// export const r = 10;
//// export const s = 12;

// @Filename: /file2.ts
//// /*a*/const a = 1;
//// /*b*/const b = 2;
//// const c = 3;
//// const d = 4;

// @Filename: /tsconfig.json
////{ "files": ["file1.ts", "file2.ts", "file3.ts"] }

goTo.select("a", "b");
format.setOption("insertSpaceAfterSemicolonInForStatements", true);
verify.postPasteImportFix({
    targetFile: "file2.ts", 
    pastes: [{
        text: `const g = p + q;\n`,
        range: { pos: 13, end: 26 },
    },
    {
        text: `function e();
const f = r + s;`,
        range: { pos: 39, end: 51 },
    
    }],
    newFileContents: {
        "/file2.ts":
`import { p, q } from "./file1";

import { r, s } from "./file3";

const a = 1;
const g = p + q;
const c = 3;
function e();
const f = r + s;`
    }
});