/// <reference path="../fourslash.ts" />

// @Filename: /a.ts
//// [||]

// @Filename: /b.ts
//// export const b = 10;

// @Filename: /tsconfig.json
////{ "files": ["a.ts", "b.ts"] }

const range = test.ranges();
verify.pasteEdits({
    args: {
        pastedText: [
            `const b = 1;
console.log(b);`],
        pasteLocations: [range[0]],
    },
    newFileContents: {}
});
