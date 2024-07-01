/// <reference path="../fourslash.ts" />

// @Filename: /target.ts
//// const k = 1;
//// [|console.log(k);|]
////
//// [||]
//// console.log("test");

// @Filename: /tsconfig.json
////{ "files": ["target.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [ `console.log(k);`],
        pasteLocations: [range[1]],
        copiedFrom: { file: "target.ts", range: [range[0]] },
    },
    newFileContents: {
        "/target.ts":
`const k = 1;
console.log(k);

console.log(k);
console.log("test");`
    }
});
