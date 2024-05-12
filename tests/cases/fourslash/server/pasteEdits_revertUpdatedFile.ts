/// <reference path="../fourslash.ts" />

// @Filename: /target.ts
//// import { t } from "./other";
//// const a = t + 1;
//// [|const b = 10;|]
//// type T = number;
//// var x;
//// var y = x as /*1*/

// @Filename: /other.ts
//// export const t = 1;

// @Filename: /other2.ts
//// export const t2 = 1;

// @Filename: /tsconfig.json
////{ "files": ["target.ts", "other.ts", "other2.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [ `const m = t2 + 1;`],
    pasteLocations: [range[0]],
    },
    newFileContents: {
        "/target.ts":
`import { t } from "./other";
import { t2 } from "./other2";
const a = t + 1;
const m = t2 + 1;
type T = number;
var x;
var y = x as `
    }
});
verify.completions({ marker: "1", includes: "T" });

