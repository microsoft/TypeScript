/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/target.ts
//// const a = 10;
//// const b = 10;[||]
//// const c = 10;

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["target.ts"] }

verify.pasteEdits({
    args: {
        pastedText: [ `/**
* Testing comment line 1
* line 2
* line 3
* line 4
*/`],
    pasteLocations: test.ranges(),
    },
    newFileContents: {}
});