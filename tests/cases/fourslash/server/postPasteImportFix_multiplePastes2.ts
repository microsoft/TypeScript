/// <reference path="../fourslash.ts" />

// @Filename: /file1.ts
//// import { aa, bb } from "./other";
//// export const r = 10;
//// export const s = 12;
//// export const t = aa + bb + r + s;
//// const u = 1;

// @Filename: /target.ts
//// /*a*/const a = 1;
//// /*b*/const b = 2;
//// const c = 3;
//// const d = 4;

// @Filename: /other.ts
//// export const aa = 1;
//// export const bb = 2;

// @Filename: /tsconfig.json
////{ "files": ["file1.ts", "target.ts", "other.ts"] }

goTo.select("a", "b");
format.setOption("insertSpaceAfterSemicolonInForStatements", true);
verify.postPasteImportFix({
    targetFile: "target.ts", 
    pastes: [{
        text: `export const t = aa + bb + r + s;\n
const u = 1;`,
        range: { pos: 13, end: 26 },
    },
    {
        text: `export const t = aa + bb + r + s;\n
const u = 1;`,
        range: { pos: 39, end: 51 },
    
    }],
    newFileContents: {
        "/target.ts":
`import { r, s } from "./file1";
import { aa, bb } from "./other";

const a = 1;
export const t = aa + bb + r + s;
const c = 3;
const u = 1;`
    }, 
    originalFile: "file1.ts",
    copyRange: { start: { line : 3, offset: 0}, end : { line: 4, offset: 12}},
});