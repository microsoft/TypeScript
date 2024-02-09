/// <reference path="../fourslash.ts" />

// @Filename: /target.ts
//// const a = 1;
//// [|const b = 2;|]
//// const c = 3;
//// [||]
//// const d = 4;

// @Filename: /file1.ts
//// import { aa, bb } from "./other";
//// export const r = 10;
//// export const s = 12;
//// export const t = aa + bb + r + s;
//// const u = 1;

// @Filename: /other.ts
//// export const aa = 1;
//// export const bb = 2;

// @Filename: /tsconfig.json
////{ "files": ["file1.ts", "target.ts", "other.ts"] }

const range = test.ranges();
format.setOption("insertSpaceAfterSemicolonInForStatements", true);
verify.postPasteImportFixes({
    pastes: [{
        text: `export const t = aa + bb + r + s;
const u = 1;`,
        range: range[0],
    },
    {
        text: `export const t = aa + bb + r + s;
const u = 1;`,
        range: range[1],
    
    }],
    newFileContents: {
        "/target.ts":
`import { r, s } from "./file1";

import { aa, bb } from "./other";

const a = 1;
export const t = aa + bb + r + s;
const u = 1;
const c = 3;
export const t = aa + bb + r + s;
const u = 1;
const d = 4;`
    }, 
    copySpan: { file: "file1.ts", start: { line : 3, offset: 0}, end : { line: 4, offset: 12}},
});