/// <reference path="../fourslash.ts" />

// @Filename: /target.ts
//// const k = 1;
//// [|console.log(k);|]
////
//// [||]
//// console.log("test");

// @Filename: /tsconfig.json
////{ "files": ["target.ts"] }

const ranges = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [ `console.log(k);`],
        pasteLocations: [ranges[1]],
        copiedFrom: { file: "target.ts", range: [ranges[0]] },
    },
    newFileContents: {}
});
