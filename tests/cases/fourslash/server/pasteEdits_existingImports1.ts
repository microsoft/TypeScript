/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/target.ts
//// import { t } from "./other";
//// import { t3 } from "./other3";
//// const a = t + 1;
//// [|const b = 10;|]
//// const c = 10;

// @Filename: /home/src/workspaces/project/other.ts
//// export const t = 1;

// @Filename: /home/src/workspaces/project/other2.ts
//// export const t2 = 1;

// @Filename: /home/src/workspaces/project/other3.ts
//// export const t3 = 1;

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["target.ts", "other.ts", "other2.ts", "other3.ts"] }

verify.pasteEdits({
    args: {
        pastedText: [ `const m = t3 + t2 + 1;`],
        pasteLocations: test.ranges(),
    },
    newFileContents: {
        "/home/src/workspaces/project/target.ts":
`import { t } from "./other";
import { t2 } from "./other2";
import { t3 } from "./other3";
const a = t + 1;
const m = t3 + t2 + 1;
const c = 10;`
    }
});
