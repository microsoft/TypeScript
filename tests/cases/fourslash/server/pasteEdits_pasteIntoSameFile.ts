/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/target.ts
//// const k = 1;
//// [|console.log(k);|]
////
//// [||]
//// console.log("test");

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["target.ts"] }

const ranges = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [ `console.log(k);`],
        pasteLocations: [ranges[1]],
        copiedFrom: { file: "/home/src/workspaces/project/target.ts", range: [ranges[0]] },
    },
    newFileContents: {}
});
