/// <reference path="../fourslash.ts" />

// @Filename: /c.ts
////[||]

// @Filename: /a.ts
//// export const abc = 10;

// @Filename: /b.ts
//// import { abc } from "./a";
////
//// [|console.log(abc);
//// 
//// |]
//// console.log("abc");

// @Filename: /tsconfig.json
////{ "files": ["c.ts", "a.ts", "b.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`console.log(abc);`],
        pasteLocations: [range[0]],
        copiedFrom: { file: "b.ts", range: [range[1]] },
    },
    newFileContents: {
        "/c.ts":
`import { abc } from "./a";

console.log(abc);`
    }
});
