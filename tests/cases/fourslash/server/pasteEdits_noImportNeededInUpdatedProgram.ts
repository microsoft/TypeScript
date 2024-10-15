/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/a.ts
//// [||]

// @Filename: /home/src/workspaces/project/b.ts
//// export const b = 10;

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["a.ts", "b.ts"] }

verify.pasteEdits({
    args: {
        pastedText: [
            `const b = 1;
console.log(b);`],
        pasteLocations: test.ranges(),
    },
    newFileContents: {}
});
