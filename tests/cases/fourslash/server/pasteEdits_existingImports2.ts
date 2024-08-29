/// <reference path="../fourslash.ts" />

// @Filename: /target.ts
//// import { t } from "./other";
//// import { t3 } from "./other3";
//// const a = t + 1;
//// [|const b = 10;|]
//// const c = 10;

// @Filename: /other.ts
//// export const t = 1;

// @Filename: /other2.ts
//// export const t2 = 1;

// @Filename: /other3.ts
//// export const t3 = 1;

// @Filename: /originalFile.ts
//// import { t2 } from "./other2";
//// import { t3 } from "./other3";
//// export const n = 10;
//// [|export const m = t3 + t2 + n;|]

// @Filename: /tsconfig.json
////{ "files": ["target.ts", "originalFile.ts", "other.ts", "other2.ts", "other3.ts"] }

const ranges = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [ `const m = t3 + t2 + n;` ],
        pasteLocations: [ranges[0]],
        copiedFrom: { file: "originalFile.ts", range: [ranges[1]] },
    }, 
    newFileContents: {
        "/target.ts":
`import { n } from "./originalFile";
import { t } from "./other";
import { t2 } from "./other2";
import { t3 } from "./other3";
const a = t + 1;
const m = t3 + t2 + n;
const c = 10;`
    }
});
