/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/folder/c.ts
////[||]

// @Filename: /home/src/workspaces/project/a.ts
//// export const abc = 10;

// @Filename: /home/src/workspaces/project/b.ts
//// import { abc } from "./a";
////
//// [|console.log(abc);
//// 
//// |]
//// console.log("abc");

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["folder/c.ts", "a.ts", "b.ts"] }

const ranges = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [`console.log(abc);`],
        pasteLocations: [ranges[0]],
        copiedFrom: { file: "/home/src/workspaces/project/b.ts", range: [ranges[1]] },
    },
    newFileContents: {
        "/home/src/workspaces/project/folder/c.ts":
`import { abc } from "../a";

console.log(abc);`
    }
});
