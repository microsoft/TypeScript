/// <reference path="../fourslash.ts" />

// @Filename: /target.ts
//// const a = 1;
//// [||]
//// const b = 2;
//// const c = 3;
//// [||]
//// const d = 4;

// @Filename: /file1.ts
//// export const p = 10;
//// export const q = 12;

// @Filename: /file3.ts
//// export const r = 10;
//// export const s = 12;

// @Filename: /tsconfig.json
////{ "files": ["file1.ts", "target.ts", "file3.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [ `const g = p + q;
function e();
const f = r + s;`],
    pasteLocations: [range[0], range[1]],
    },
    newFileContents: {
        "/target.ts":
`import { p, q } from "./file1";
import { r, s } from "./file3";

const a = 1;
const g = p + q;
function e();
const f = r + s;
const b = 2;
const c = 3;
const g = p + q;
function e();
const f = r + s;
const d = 4;`
    }
});