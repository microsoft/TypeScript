/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/target.ts
//// const a = 1;
//// [||]
//// [|const b = 2;|]
//// const c = 3;
//// [||]
//// const d = 4;

// @Filename: /home/src/workspaces/project/file1.ts
//// export const p = 10;
//// export const q = 12;

// @Filename: /home/src/workspaces/project/file3.ts
//// export const r = 10;
//// export const s = 12;

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["file1.ts", "target.ts", "file3.ts"] }

const ranges = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [ "const g = p + q;", "const f = r + s;"],
    pasteLocations: [ranges[0], ranges[1], ranges[2]],
    },
    newFileContents: {
        "/home/src/workspaces/project/target.ts":
`import { p, q } from "./file1";
import { r, s } from "./file3";

const a = 1;
const g = p + q;
const f = r + s;
const g = p + q;
const f = r + s;
const c = 3;
const g = p + q;
const f = r + s;
const d = 4;`
    }
});