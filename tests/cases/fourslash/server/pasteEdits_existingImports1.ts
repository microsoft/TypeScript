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

// @Filename: /tsconfig.json
////{ "files": ["target.ts", "other.ts", "other2.ts", "other3.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [ `const m = t3 + t2 + 1;`],
        pasteLocations: [range[0]],
    },
    newFileContents: {
        "/target.ts":
`import { t } from "./other";
import { t2 } from "./other2";
import { t3 } from "./other3";
const a = t + 1;
const m = t3 + t2 + 1;
const c = 10;`
    }
});
